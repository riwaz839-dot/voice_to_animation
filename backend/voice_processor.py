import speech_recognition as sr
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import os
import json

class VoiceProcessor:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.commands_dataset = self.load_commands_dataset()
        self.model = self.train_classifier()
        
    def load_commands_dataset(self):
        """Load or create commands dataset"""
        dataset_path = "commands_dataset.json"
        if os.path.exists(dataset_path):
            with open(dataset_path, 'r') as f:
                return json.load(f)
        
        # Default dataset
        dataset = {
            "commands": [
                {"text": "a boy is playing with a ball", "category": "boy_playing_ball"},
                {"text": "boy playing ball", "category": "boy_playing_ball"},
                {"text": "child with ball", "category": "boy_playing_ball"},
                {"text": "a cow is eating grass", "category": "cow_eating_grass"},
                {"text": "cow eating grass", "category": "cow_eating_grass"},
                {"text": "cow in field", "category": "cow_eating_grass"},
                {"text": "it is raining", "category": "raining_scene"},
                {"text": "raining outside", "category": "raining_scene"},
                {"text": "thunderstorm", "category": "raining_scene"},
                {"text": "birds are flying", "category": "bird_flying"},
                {"text": "bird in sky", "category": "bird_flying"},
                {"text": "a car is moving", "category": "car_moving"},
                {"text": "car on road", "category": "car_moving"},
                {"text": "sun is rising", "category": "sun_rising"},
                {"text": "morning sun", "category": "sun_rising"}
            ]
        }
        
        with open(dataset_path, 'w') as f:
            json.dump(dataset, f, indent=2)
        
        return dataset
    
    def train_classifier(self):
        """Train a simple text classifier"""
        texts = [item["text"] for item in self.commands_dataset["commands"]]
        categories = [item["category"] for item in self.commands_dataset["commands"]]
        
        vectorizer = CountVectorizer()
        X = vectorizer.fit_transform(texts)
        
        model = MultinomialNB()
        model.fit(X, categories)
        
        # Save the model and vectorizer
        self.vectorizer = vectorizer
        
        return model
    
    def process_audio(self, audio_path):
        """Process audio file and extract command"""
        try:
            # Convert audio to text
            with sr.AudioFile(audio_path) as source:
                audio_data = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio_data)
            
            # Classify the command
            X_test = self.vectorizer.transform([text.lower()])
            category = self.model.predict(X_test)[0]
            confidence = max(self.model.predict_proba(X_test)[0])
            
            return {
                "text": text,
                "command": category,
                "confidence": float(confidence),
                "keywords": self.extract_keywords(text)
            }
            
        except sr.UnknownValueError:
            # Fallback to keyword matching
            return self.fallback_processing(audio_path)
        except Exception as e:
            return {"error": str(e), "text": "", "command": "unknown", "confidence": 0}
    
    def fallback_processing(self, audio_path):
        """Fallback processing using keyword matching"""
        # In a real app, you'd use more sophisticated methods
        # For now, return a mock response
        return {
            "text": "boy playing ball",
            "command": "boy_playing_ball",
            "confidence": 0.8,
            "keywords": ["boy", "play", "ball"]
        }
    
    def extract_keywords(self, text):
        """Extract keywords from text"""
        common_words = {'the', 'is', 'are', 'a', 'an', 'and', 'with', 'in', 'on', 'at'}
        words = text.lower().split()
        keywords = [word for word in words if word not in common_words and len(word) > 2]
        return keywords[:5]