import json
import random
from datetime import datetime

class AnimationGenerator:
    def __init__(self):
        self.scenes = {
            "boy_playing_ball": self.generate_boy_playing_ball,
            "cow_eating_grass": self.generate_cow_eating_grass,
            "raining_scene": self.generate_raining_scene,
            "bird_flying": self.generate_bird_flying,
            "car_moving": self.generate_car_moving,
            "sun_rising": self.generate_sun_rising
        }
    
    def generate_animation(self, voice_data):
        """Generate animation based on voice command"""
        command = voice_data.get("command", "unknown")
        
        if command in self.scenes:
            return self.scenes[command]()
        else:
            return self.generate_default_scene()
    
    def generate_boy_playing_ball(self):
        """Generate boy playing ball animation"""
        return {
            "scene": "boy_playing_ball",
            "background": {
                "type": "gradient",
                "colors": ["#87CEEB", "#98FB98"],
                "direction": "vertical"
            },
            "elements": [
                {
                    "id": "boy",
                    "type": "character",
                    "x": 100,
                    "y": 300,
                    "width": 60,
                    "height": 120,
                    "color": "#FF6347",
                    "animation": {
                        "type": "bounce",
                        "duration": 2,
                        "repeat": "infinite"
                    }
                },
                {
                    "id": "ball",
                    "type": "object",
                    "x": 200,
                    "y": 350,
                    "radius": 30,
                    "color": "#FF0000",
                    "animation": {
                        "type": "bounce",
                        "duration": 1.5,
                        "repeat": "infinite",
                        "height": 50
                    }
                },
                {
                    "id": "sun",
                    "type": "object",
                    "x": 600,
                    "y": 80,
                    "radius": 50,
                    "color": "#FFD700",
                    "animation": {
                        "type": "pulse",
                        "duration": 3,
                        "repeat": "infinite"
                    }
                },
                {
                    "id": "tree1",
                    "type": "object",
                    "x": 400,
                    "y": 250,
                    "width": 40,
                    "height": 100,
                    "color": "#228B22",
                    "shape": "triangle"
                }
            ],
            "duration": 10,
            "audio_effect": "happy_music"
        }
    
    def generate_cow_eating_grass(self):
        """Generate cow eating grass animation"""
        return {
            "scene": "cow_eating_grass",
            "background": {
                "type": "gradient",
                "colors": ["#87CEEB", "#32CD32"],
                "direction": "vertical"
            },
            "elements": [
                {
                    "id": "cow",
                    "type": "character",
                    "x": 300,
                    "y": 250,
                    "width": 100,
                    "height": 80,
                    "color": "#FFFFFF",
                    "spots": True,
                    "animation": {
                        "type": "eat",
                        "duration": 2,
                        "repeat": "infinite"
                    }
                },
                {
                    "id": "grass1",
                    "type": "object",
                    "x": 200,
                    "y": 350,
                    "width": 400,
                    "height": 50,
                    "color": "#228B22",
                    "animation": {
                        "type": "wave",
                        "duration": 3,
                        "repeat": "infinite"
                    }
                },
                {
                    "id": "fence1",
                    "type": "object",
                    "x": 100,
                    "y": 320,
                    "width": 500,
                    "height": 20,
                    "color": "#8B4513"
                }
            ],
            "duration": 10,
            "audio_effect": "farm_ambience"
        }
    
    def generate_raining_scene(self):
        """Generate raining scene animation"""
        raindrops = []
        for i in range(50):
            raindrops.append({
                "id": f"raindrop_{i}",
                "type": "raindrop",
                "x": random.randint(0, 800),
                "y": random.randint(-100, 0),
                "length": random.randint(10, 30),
                "speed": random.uniform(2, 5),
                "color": "#4682B4"
            })
        
        return {
            "scene": "raining_scene",
            "background": {
                "type": "solid",
                "color": "#36454F"
            },
            "elements": raindrops + [
                {
                    "id": "cloud1",
                    "type": "object",
                    "x": 200,
                    "y": 50,
                    "width": 150,
                    "height": 80,
                    "color": "#708090",
                    "shape": "cloud"
                },
                {
                    "id": "cloud2",
                    "type": "object",
                    "x": 450,
                    "y": 80,
                    "width": 120,
                    "height": 60,
                    "color": "#778899",
                    "shape": "cloud"
                },
                {
                    "id": "lightning",
                    "type": "effect",
                    "x": 300,
                    "y": 100,
                    "color": "#FFFF00",
                    "animation": {
                        "type": "flash",
                        "duration": 0.5,
                        "repeat": "random"
                    }
                }
            ],
            "duration": 10,
            "audio_effect": "rain_thunder"
        }
    
    def generate_bird_flying(self):
        """Generate bird flying animation"""
        birds = []
        for i in range(5):
            birds.append({
                "id": f"bird_{i}",
                "type": "bird",
                "x": random.randint(-100, 900),
                "y": random.randint(50, 200),
                "size": random.randint(20, 40),
                "color": "#000000",
                "animation": {
                    "type": "fly",
                    "duration": random.uniform(3, 8),
                    "direction": "right"
                }
            })
        
        return {
            "scene": "bird_flying",
            "background": {
                "type": "gradient",
                "colors": ["#87CEEB", "#E0FFFF"],
                "direction": "vertical"
            },
            "elements": birds + [
                {
                    "id": "sun",
                    "type": "object",
                    "x": 700,
                    "y": 80,
                    "radius": 60,
                    "color": "#FFA500"
                },
                {
                    "id": "cloud",
                    "type": "object",
                    "x": 200,
                    "y": 100,
                    "width": 100,
                    "height": 50,
                    "color": "#FFFFFF",
                    "shape": "cloud"
                }
            ],
            "duration": 10,
            "audio_effect": "birds_chirping"
        }
    
    def generate_car_moving(self):
        """Generate car moving animation"""
        return {
            "scene": "car_moving",
            "background": {
                "type": "gradient",
                "colors": ["#87CEEB", "#A9A9A9"],
                "direction": "vertical"
            },
            "elements": [
                {
                    "id": "car",
                    "type": "vehicle",
                    "x": -100,
                    "y": 300,
                    "width": 120,
                    "height": 60,
                    "color": "#FF0000",
                    "animation": {
                        "type": "move",
                        "duration": 5,
                        "direction": "right",
                        "repeat": "infinite"
                    }
                },
                {
                    "id": "road",
                    "type": "object",
                    "x": 0,
                    "y": 350,
                    "width": 800,
                    "height": 80,
                    "color": "#696969"
                },
                {
                    "id": "building1",
                    "type": "object",
                    "x": 100,
                    "y": 200,
                    "width": 80,
                    "height": 150,
                    "color": "#708090"
                },
                {
                    "id": "building2",
                    "type": "object",
                    "x": 500,
                    "y": 180,
                    "width": 100,
                    "height": 170,
                    "color": "#778899"
                }
            ],
            "duration": 10,
            "audio_effect": "car_engine"
        }
    
    def generate_sun_rising(self):
        """Generate sun rising animation"""
        return {
            "scene": "sun_rising",
            "background": {
                "type": "gradient",
                "colors": ["#FF4500", "#FFD700", "#87CEEB"],
                "direction": "vertical"
            },
            "elements": [
                {
                    "id": "sun",
                    "type": "object",
                    "x": 400,
                    "y": 500,
                    "radius": 60,
                    "color": "#FFD700",
                    "animation": {
                        "type": "rise",
                        "duration": 8,
                        "endY": 100
                    }
                },
                {
                    "id": "horizon",
                    "type": "object",
                    "x": 0,
                    "y": 350,
                    "width": 800,
                    "height": 100,
                    "color": "#556B2F"
                },
                {
                    "id": "bird1",
                    "type": "bird",
                    "x": 200,
                    "y": 150,
                    "size": 30,
                    "color": "#000000",
                    "animation": {
                        "type": "fly",
                        "duration": 4,
                        "direction": "right"
                    }
                }
            ],
            "duration": 10,
            "audio_effect": "morning_birds"
        }
    
    def generate_default_scene(self):
        """Generate default animation scene"""
        return {
            "scene": "default",
            "background": {
                "type": "solid",
                "color": "#87CEEB"
            },
            "elements": [
                {
                    "id": "smiley",
                    "type": "character",
                    "x": 400,
                    "y": 250,
                    "radius": 80,
                    "color": "#FFFF00",
                    "animation": {
                        "type": "rotate",
                        "duration": 3,
                        "repeat": "infinite"
                    }
                }
            ],
            "duration": 5,
            "audio_effect": "happy_music"
        }