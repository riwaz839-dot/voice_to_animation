from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import tempfile
from datetime import datetime
from voice_processor import VoiceProcessor
from animation_generator import AnimationGenerator
from audio_generator import AudioGenerator
import base64
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize processors
voice_processor = VoiceProcessor()
animation_generator = AnimationGenerator()
audio_generator = AudioGenerator()

# Ensure upload directory exists
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.route('/api/process-voice', methods=['POST'])
def process_voice():
    try:
        # Get audio file from request
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files['audio']
        
        # Save temporary file
        temp_path = os.path.join(UPLOAD_FOLDER, f"temp_{datetime.now().timestamp()}.wav")
        audio_file.save(temp_path)
        
        # Process voice
        voice_data = voice_processor.process_audio(temp_path)
        
        # Generate animation based on voice command
        animation_data = animation_generator.generate_animation(voice_data)
        
        # Generate audio response
        audio_output = audio_generator.generate_audio(voice_data)
        
        # Clean up temp file
        os.remove(temp_path)
        
        return jsonify({
            "success": True,
            "command": voice_data.get("command", ""),
            "confidence": voice_data.get("confidence", 0),
            "animation": animation_data,
            "audio_url": f"data:audio/wav;base64,{base64.b64encode(audio_output).decode('utf-8')}"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/scenes', methods=['GET'])
def get_scenes():
    """Get available animation scenes"""
    scenes = [
        {
            "id": "boy_playing_ball",
            "name": "Boy Playing Ball",
            "description": "A boy playing with a bouncing ball",
            "keywords": ["boy", "play", "ball", "bounce", "throw"]
        },
        {
            "id": "cow_eating_grass",
            "name": "Cow Eating Grass",
            "description": "A cow eating grass in the field",
            "keywords": ["cow", "eat", "grass", "field", "animal"]
        },
        {
            "id": "raining_scene",
            "name": "Raining Scene",
            "description": "Rain falling with thunder effects",
            "keywords": ["rain", "raining", "thunder", "storm", "weather"]
        },
        {
            "id": "bird_flying",
            "name": "Bird Flying",
            "description": "Birds flying in the sky",
            "keywords": ["bird", "fly", "sky", "wings", "air"]
        },
        {
            "id": "car_moving",
            "name": "Car Moving",
            "description": "A car moving on the road",
            "keywords": ["car", "drive", "road", "vehicle", "move"]
        },
        {
            "id": "sun_rising",
            "name": "Sun Rising",
            "description": "Sun rising with morning effects",
            "keywords": ["sun", "rise", "morning", "day", "light"]
        }
    ]
    return jsonify({"scenes": scenes})

@app.route('/api/generate-animation', methods=['POST'])
def generate_animation():
    """Generate animation from text command"""
    try:
        data = request.json
        command = data.get('command', '').lower()
        
        # Simple rule-based animation generation
        animation_data = {
            "scene": "default",
            "elements": [],
            "background": "#87CEEB",  # Sky blue
            "duration": 5  # seconds
        }
        
        if "boy" in command and "ball" in command:
            animation_data = animation_generator.generate_boy_playing_ball()
        elif "cow" in command and ("eat" in command or "grass" in command):
            animation_data = animation_generator.generate_cow_eating_grass()
        elif "rain" in command or "raining" in command:
            animation_data = animation_generator.generate_raining_scene()
        elif "bird" in command and "fly" in command:
            animation_data = animation_generator.generate_bird_flying()
        elif "car" in command:
            animation_data = animation_generator.generate_car_moving()
        elif "sun" in command and "rise" in command:
            animation_data = animation_generator.generate_sun_rising()
        
        return jsonify({
            "success": True,
            "animation": animation_data,
            "command": command
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)