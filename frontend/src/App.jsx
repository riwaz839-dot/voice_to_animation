import React, { useState } from 'react';
import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import AnimationCanvas from './components/AnimationCanvas';
import SceneSelector from './components/SceneSelector';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [animationData, setAnimationData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [command, setCommand] = useState('');

  const handleVoiceProcessed = (data) => {
    setAnimationData(data.animation);
    setAudioUrl(data.audio_url);
    setCommand(data.command);
  };

  const handleSceneSelect = (sceneId) => {
    // Mock animation for selected scene
    const mockAnimations = {
      boy_playing_ball: {
        scene: "boy_playing_ball",
        elements: [],
        background: "#87CEEB"
      },
      cow_eating_grass: {
        scene: "cow_eating_grass",
        elements: [],
        background: "#32CD32"
      },
      raining_scene: {
        scene: "raining_scene",
        elements: [],
        background: "#36454F"
      }
    };
    
    setAnimationData(mockAnimations[sceneId] || mockAnimations.boy_playing_ball);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎤 Voice to Animation</h1>
        <p className="subtitle">Speak and watch your words come to life!</p>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <div className="control-card">
            <h2>🎤 Voice Input</h2>
            <VoiceRecorder 
              onProcessing={setIsProcessing}
              onVoiceProcessed={handleVoiceProcessed}
            />
          </div>

          <div className="control-card">
            <h2>📋 Scenes Library</h2>
            <SceneSelector onSceneSelect={handleSceneSelect} />
          </div>

          {command && (
            <div className="control-card">
              <h2>📝 Detected Command</h2>
              <div className="command-display">
                <span className="command-text">{command}</span>
                <span className="confidence-badge">✓ 85% confident</span>
              </div>
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="animation-container">
            <h2>🎬 Animation Preview</h2>
            <AnimationCanvas 
              animationData={animationData}
              isProcessing={isProcessing}
            />
          </div>

          <div className="audio-container">
            <h2>🔊 Audio Output</h2>
            <AudioPlayer audioUrl={audioUrl} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Final Year Project - Voice to Animation System</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#help">Help</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;