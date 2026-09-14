import React, { useState, useEffect } from 'react';
import { FaPlay, FaImage, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import './SceneSelector.css';

const SceneSelector = ({ onSceneSelect }) => {
  const [scenes, setScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    try {
      // Mock data for demo
      const mockScenes = [
        {
          id: 'boy_playing_ball',
          name: '👦 Boy Playing Ball',
          description: 'A boy playing with a bouncing ball',
          keywords: ['boy', 'play', 'ball', 'bounce', 'throw'],
          color: '#FF6347'
        },
        {
          id: 'cow_eating_grass',
          name: '🐄 Cow Eating Grass',
          description: 'A cow eating grass in the field',
          keywords: ['cow', 'eat', 'grass', 'field', 'animal'],
          color: '#32CD32'
        },
        {
          id: 'raining_scene',
          name: '🌧️ Raining Scene',
          description: 'Rain falling with thunder effects',
          keywords: ['rain', 'raining', 'thunder', 'storm', 'weather'],
          color: '#4682B4'
        },
        {
          id: 'bird_flying',
          name: '🐦 Bird Flying',
          description: 'Birds flying in the sky',
          keywords: ['bird', 'fly', 'sky', 'wings', 'air'],
          color: '#87CEEB'
        },
        {
          id: 'car_moving',
          name: '🚗 Car Moving',
          description: 'A car moving on the road',
          keywords: ['car', 'drive', 'road', 'vehicle', 'move'],
          color: '#FF0000'
        },
        {
          id: 'sun_rising',
          name: '🌅 Sun Rising',
          description: 'Sun rising with morning effects',
          keywords: ['sun', 'rise', 'morning', 'day', 'light'],
          color: '#FFD700'
        }
      ];
      
      setScenes(mockScenes);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching scenes:', error);
      setLoading(false);
    }
  };

  const handleSceneSelect = (scene) => {
    setSelectedScene(scene);
    onSceneSelect(scene.id);
  };

  const generateFromText = async () => {
    const text = prompt('Enter a scene description:');
    if (text) {
      try {
        const response = await axios.post('http://localhost:5000/api/generate-animation', {
          command: text
        });
        
        if (response.data.success) {
          onSceneSelect(response.data.animation.scene);
          alert('Animation generated from text!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Using mock animation');
        onSceneSelect('boy_playing_ball');
      }
    }
  };

  const downloadScene = (scene) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // Draw scene preview
    ctx.fillStyle = scene.color || '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw scene name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(scene.name, canvas.width/2, canvas.height/2);
    
    // Convert to image and download
    const link = document.createElement('a');
    link.download = `${scene.id}_preview.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (loading) {
    return (
      <div className="scene-selector loading">
        <div className="spinner"></div>
        <p>Loading scenes...</p>
      </div>
    );
  }

  return (
    <div className="scene-selector">
      <div className="scene-grid">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`scene-card ${selectedScene?.id === scene.id ? 'selected' : ''}`}
            onClick={() => handleSceneSelect(scene)}
            style={{ borderColor: scene.color }}
          >
            <div className="scene-icon" style={{ backgroundColor: scene.color }}>
              {scene.name.charAt(0)}
            </div>
            <div className="scene-info">
              <h3>{scene.name}</h3>
              <p>{scene.description}</p>
              <div className="scene-keywords">
                {scene.keywords.slice(0, 3).map(keyword => (
                  <span key={keyword} className="keyword-tag">#{keyword}</span>
                ))}
              </div>
            </div>
            <div className="scene-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSceneSelect(scene);
                }}
                className="action-btn play-btn"
              >
                <FaPlay /> Play
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadScene(scene);
                }}
                className="action-btn download-btn"
              >
                <FaDownload />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="scene-actions-footer">
        <button onClick={generateFromText} className="generate-text-btn">
          <FaImage /> Generate from Text
        </button>
        <p className="hint-text">
          💡 Click any scene to preview, or use voice command for automatic detection
        </p>
      </div>
    </div>
  );
};

export default SceneSelector;