import numpy as np
import wave
import io
import random
from scipy import signal
import simpleaudio as sa

class AudioGenerator:
    def __init__(self):
        self.sample_rate = 44100
        
    def generate_audio(self, voice_data):
        """Generate audio based on voice command"""
        command = voice_data.get("command", "unknown")
        
        if command == "boy_playing_ball":
            return self.generate_happy_music()
        elif command == "cow_eating_grass":
            return self.generate_farm_ambience()
        elif command == "raining_scene":
            return self.generate_rain_thunder()
        elif command == "bird_flying":
            return self.generate_birds_chirping()
        elif command == "car_moving":
            return self.generate_car_engine()
        elif command == "sun_rising":
            return self.generate_morning_birds()
        else:
            return self.generate_default_sound()
    
    def generate_happy_music(self):
        """Generate happy background music"""
        duration = 5  # seconds
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Create a simple melody
        melody_freqs = [262, 330, 392, 523, 392, 330, 262]  # C major scale
        melody = np.array([])
        
        for freq in melody_freqs:
            note = np.sin(2 * np.pi * freq * t[:len(t)//len(melody_freqs)])
            melody = np.concatenate([melody, note])
        
        # Add some harmony
        harmony = 0.3 * np.sin(2 * np.pi * 196 * t)  # G
        
        # Combine and normalize
        audio = 0.7 * melody + harmony
        audio = audio / np.max(np.abs(audio))
        
        return self.array_to_wav_bytes(audio)
    
    def generate_farm_ambience(self):
        """Generate farm ambiance sounds"""
        duration = 5
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Cow sound (moo)
        cow_freq = 100 + 20 * np.sin(2 * np.pi * 2 * t)
        cow_sound = 0.5 * np.sin(2 * np.pi * cow_freq * t) * np.exp(-2 * t/duration)
        
        # Background wind
        wind = 0.1 * np.random.randn(len(t))
        
        # Combine
        audio = cow_sound + wind
        audio = audio / np.max(np.abs(audio))
        
        return self.array_to_wav_bytes(audio)
    
    def generate_rain_thunder(self):
        """Generate rain and thunder sounds"""
        duration = 5
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Rain sound (white noise filtered to sound like rain)
        rain = np.random.randn(len(t))
        b, a = signal.butter(4, [1000/(self.sample_rate/2), 4000/(self.sample_rate/2)], btype='band')
        rain = signal.lfilter(b, a, rain)
        
        # Thunder (low frequency rumble)
        thunder_time = 2.5  # seconds
        thunder_idx = int(thunder_time * self.sample_rate)
        thunder = np.zeros(len(t))
        if thunder_idx < len(t):
            thunder_freq = 50 + 20 * np.random.rand()
            thunder_duration = 1.0
            thunder_samples = int(thunder_duration * self.sample_rate)
            thunder_envelope = np.exp(-5 * np.linspace(0, 1, thunder_samples))
            thunder_sound = thunder_envelope * np.sin(2 * np.pi * thunder_freq * 
                                                     np.linspace(0, thunder_duration, thunder_samples))
            if thunder_idx + thunder_samples < len(t):
                thunder[thunder_idx:thunder_idx+thunder_samples] = thunder_sound
        
        # Combine
        audio = 0.7 * rain + 0.8 * thunder
        audio = audio / np.max(np.abs(audio))
        
        return self.array_to_wav_bytes(audio)
    
    def generate_birds_chirping(self):
        """Generate birds chirping sounds"""
        duration = 5
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Multiple bird chirps at different times
        audio = np.zeros(len(t))
        
        for _ in range(8):
            start_time = random.uniform(0, duration-0.5)
            start_idx = int(start_time * self.sample_rate)
            chirp_duration = random.uniform(0.2, 0.5)
            chirp_samples = int(chirp_duration * self.sample_rate)
            
            if start_idx + chirp_samples < len(t):
                chirp_t = np.linspace(0, chirp_duration, chirp_samples)
                chirp_freq = random.uniform(1000, 3000)
                chirp = np.sin(2 * np.pi * chirp_freq * chirp_t)
                
                # Add frequency sweep
                chirp_freq_sweep = chirp_freq * (1 + 0.5 * np.sin(2 * np.pi * 10 * chirp_t))
                chirp = np.sin(2 * np.pi * chirp_freq_sweep * chirp_t)
                
                # Envelope
                envelope = np.exp(-5 * chirp_t/chirp_duration) * (1 - np.exp(-20 * chirp_t/chirp_duration))
                chirp = envelope * chirp
                
                audio[start_idx:start_idx+chirp_samples] += 0.3 * chirp
        
        audio = audio / np.max(np.abs(audio))
        return self.array_to_wav_bytes(audio)
    
    def generate_car_engine(self):
        """Generate car engine sound"""
        duration = 5
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Engine rumble (low frequency with revving)
        base_freq = 80
        rev_freq = base_freq * (1 + 0.5 * np.sin(2 * np.pi * 0.5 * t))
        engine = 0.7 * np.sin(2 * np.pi * rev_freq * t)
        
        # Add some higher harmonics
        for harmonic in [2, 3, 4]:
            engine += 0.3/harmonic * np.sin(2 * np.pi * harmonic * rev_freq * t)
        
        # Road noise (high frequency)
        road_noise = 0.2 * np.random.randn(len(t))
        b, a = signal.butter(4, 2000/(self.sample_rate/2), btype='high')
        road_noise = signal.lfilter(b, a, road_noise)
        
        audio = engine + road_noise
        audio = audio / np.max(np.abs(audio))
        
        return self.array_to_wav_bytes(audio)
    
    def generate_morning_birds(self):
        """Generate morning birds with gentle sounds"""
        # Similar to birds chirping but softer
        return self.generate_birds_chirping()
    
    def generate_default_sound(self):
        """Generate default confirmation sound"""
        duration = 1
        t = np.linspace(0, duration, int(self.sample_rate * duration), False)
        
        # Simple beep
        freq = 440  # A4
        audio = 0.5 * np.sin(2 * np.pi * freq * t)
        
        # Envelope
        envelope = np.exp(-5 * t/duration)
        audio = envelope * audio
        
        audio = audio / np.max(np.abs(audio))
        return self.array_to_wav_bytes(audio)
    
    def array_to_wav_bytes(self, audio_array):
        """Convert numpy array to WAV bytes"""
        # Convert to 16-bit PCM
        audio_int16 = (audio_array * 32767).astype(np.int16)
        
        # Create WAV file in memory
        wav_bytes = io.BytesIO()
        with wave.open(wav_bytes, 'wb') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(self.sample_rate)
            wav_file.writeframes(audio_int16.tobytes())
        
        return wav_bytes.getvalue()