import React, { useEffect, useRef } from 'react';
import './AnimationCanvas.css';

const AnimationCanvas = ({ animationData, isProcessing }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      frameRef.current = 0;
    }

    if (!animationData || isProcessing) {
      drawLoadingScreen(ctx, canvas.width, canvas.height, isProcessing);
      return;
    }

    // Start animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScene(ctx, canvas.width, canvas.height, animationData, frameRef.current);
      frameRef.current++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationData, isProcessing]);

  const drawLoadingScreen = (ctx, width, height, isProcessing) => {
    // Draw background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Draw loading text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    
    if (isProcessing) {
      ctx.fillText('🎤 Processing Voice Command...', width / 2, height / 2 - 30);
      
      // Draw loading animation
      const dots = '.'.repeat((frameRef.current % 4) + 1);
      ctx.fillText(`Loading${dots}`, width / 2, height / 2 + 30);
    } else {
      ctx.fillText('🎬 Ready for Animation', width / 2, height / 2);
      ctx.font = '16px Arial';
      ctx.fillText('Record your voice to see magic!', width / 2, height / 2 + 40);
    }
  };

  const drawScene = (ctx, width, height, data, frame) => {
    // Draw background based on scene type
    if (data.background && data.background.type === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      data.background.colors.forEach((color, index) => {
        gradient.addColorStop(index / (data.background.colors.length - 1), color);
      });
      ctx.fillStyle = gradient;
    } else if (data.background && data.background.color) {
      ctx.fillStyle = data.background.color;
    } else {
      ctx.fillStyle = '#87CEEB'; // Default sky blue
    }
    
    ctx.fillRect(0, 0, width, height);

    // Draw scene elements
    switch (data.scene) {
      case 'boy_playing_ball':
        drawBoyPlayingBall(ctx, width, height, frame);
        break;
      case 'cow_eating_grass':
        drawCowEatingGrass(ctx, width, height, frame);
        break;
      case 'raining_scene':
        drawRainingScene(ctx, width, height, frame);
        break;
      case 'bird_flying':
        drawBirdFlying(ctx, width, height, frame);
        break;
      case 'car_moving':
        drawCarMoving(ctx, width, height, frame);
        break;
      case 'sun_rising':
        drawSunRising(ctx, width, height, frame);
        break;
      default:
        drawDefaultScene(ctx, width, height, frame);
    }

    // Draw scene title
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(getSceneTitle(data.scene), width / 2, 30);
  };

  const drawBoyPlayingBall = (ctx, width, height, frame) => {
    const centerX = width / 2;
    const groundY = height * 0.7;
    
    // Draw ground
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(0, groundY, width, height - groundY);
    
    // Draw boy
    const boyX = centerX - 100 + Math.sin(frame * 0.05) * 30;
    const boyY = groundY - 120;
    
    // Boy's body
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(boyX - 15, boyY, 30, 60);
    
    // Boy's head
    ctx.fillStyle = '#FFE4B5';
    ctx.beginPath();
    ctx.arc(boyX, boyY - 20, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Boy's legs
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(boyX - 20, boyY + 60, 15, 40);
    ctx.fillRect(boyX + 5, boyY + 60, 15, 40);
    
    // Ball bouncing
    const ballX = centerX + 50;
    const ballY = groundY - 50 - Math.abs(Math.sin(frame * 0.1)) * 100;
    
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(width - 80, 80, 40, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawCowEatingGrass = (ctx, width, height, frame) => {
    const groundY = height * 0.7;
    
    // Draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, groundY);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, groundY);
    
    // Draw ground
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(0, groundY, width, height - groundY);
    
    // Draw cow
    const cowX = width / 2;
    const cowY = groundY - 80;
    
    // Cow body
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(cowX - 50, cowY - 40, 100, 60);
    
    // Cow head
    ctx.fillRect(cowX + 40, cowY - 30, 40, 30);
    
    // Cow spots
    ctx.fillStyle = '#000000';
    const spots = [
      [cowX - 30, cowY - 20],
      [cowX, cowY - 10],
      [cowX + 20, cowY - 30]
    ];
    
    spots.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Grass animation
    ctx.fillStyle = '#228B22';
    for (let i = 0; i < width; i += 10) {
      const grassHeight = 20 + Math.sin(frame * 0.05 + i * 0.1) * 10;
      ctx.fillRect(i, groundY - grassHeight, 5, grassHeight);
    }
  };

  const drawRainingScene = (ctx, width, height, frame) => {
    // Dark sky
    ctx.fillStyle = '#36454F';
    ctx.fillRect(0, 0, width, height);
    
    // Draw clouds
    ctx.fillStyle = '#708090';
    drawCloud(ctx, width / 3, 60, 100, 50);
    drawCloud(ctx, width * 2/3, 40, 120, 60);
    
    // Draw raindrops
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 100; i++) {
      const x = (i * 13 + frame * 5) % width;
      const y = (i * 7 + frame * 10) % height;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 20);
      ctx.stroke();
    }
    
    // Draw ground with puddles
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
    
    // Draw lightning occasionally
    if (frame % 100 === 0) {
      ctx.fillStyle = '#FFFF00';
      ctx.fillRect(width / 2 - 5, 0, 10, height * 0.5);
    }
  };

  const drawBirdFlying = (ctx, width, height, frame) => {
    // Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0FFFF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Sun
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.arc(width - 100, 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw birds
    ctx.fillStyle = '#000000';
    const birdCount = 5;
    
    for (let i = 0; i < birdCount; i++) {
      const x = (frame * 2 + i * 100) % (width + 200) - 100;
      const y = 100 + Math.sin(frame * 0.05 + i) * 50;
      
      drawBird(ctx, x, y, frame);
    }
    
    // Draw clouds
    ctx.fillStyle = '#FFFFFF';
    drawCloud(ctx, 200, 150, 80, 40);
    drawCloud(ctx, 400, 120, 100, 50);
  };

  const drawCarMoving = (ctx, width, height, frame) => {
    const groundY = height * 0.7;
    
    // Sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, width, groundY);
    
    // Road
    ctx.fillStyle = '#696969';
    ctx.fillRect(0, groundY, width, height - groundY);
    
    // Road lines
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < width; i += 100) {
      const x = (i - frame * 2) % width;
      ctx.fillRect(x, groundY + 35, 50, 5);
    }
    
    // Car
    const carX = (frame * 3) % width;
    const carY = groundY - 30;
    
    // Car body
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(carX - 60, carY - 30, 120, 40);
    
    // Car top
    ctx.fillRect(carX - 40, carY - 50, 80, 30);
    
    // Wheels
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(carX - 30, carY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(carX + 30, carY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(carX - 30, carY - 45, 25, 20);
    ctx.fillRect(carX + 5, carY - 45, 25, 20);
  };

  const drawSunRising = (ctx, width, height, frame) => {
    // Gradient sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#FF4500');
    skyGradient.addColorStop(0.5, '#FFD700');
    skyGradient.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Sun rising
    const sunY = height * 0.8 - (frame % 300) / 300 * height * 0.6;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(width / 2, sunY, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun rays
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 3;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x1 = width / 2 + Math.cos(angle) * 70;
      const y1 = sunY + Math.sin(angle) * 70;
      const x2 = width / 2 + Math.cos(angle) * 100;
      const y2 = sunY + Math.sin(angle) * 100;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // Horizon
    ctx.fillStyle = '#556B2F';
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
  };

  const drawDefaultScene = (ctx, width, height, frame) => {
    // Simple smiley face
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    
    // Face
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - radius/2, centerY - radius/4, radius/10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + radius/2, centerY - radius/4, radius/10, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.beginPath();
    ctx.arc(centerX, centerY + radius/4, radius/2, 0, Math.PI);
    ctx.stroke();
  };

  const drawCloud = (ctx, x, y, width, height) => {
    ctx.beginPath();
    ctx.ellipse(x, y, width/2, height/2, 0, 0, Math.PI * 2);
    ctx.ellipse(x - width/4, y, width/3, height/3, 0, 0, Math.PI * 2);
    ctx.ellipse(x + width/4, y, width/3, height/3, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawBird = (ctx, x, y, frame) => {
    const wingAngle = Math.sin(frame * 0.2) * 0.5;
    
    ctx.save();
    ctx.translate(x, y);
    
    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wing
    ctx.save();
    ctx.rotate(wingAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-20, -10, 0, -30);
    ctx.quadraticCurveTo(20, -10, 0, 0);
    ctx.fill();
    ctx.restore();
    
    ctx.restore();
  };

  const getSceneTitle = (scene) => {
    const titles = {
      'boy_playing_ball': '👦 Boy Playing Ball',
      'cow_eating_grass': '🐄 Cow Eating Grass',
      'raining_scene': '🌧️ Raining Scene',
      'bird_flying': '🐦 Bird Flying',
      'car_moving': '🚗 Car Moving',
      'sun_rising': '🌅 Sun Rising',
      'default': '😊 Default Scene'
    };
    return titles[scene] || 'Unknown Scene';
  };

  return (
    <div className="animation-canvas">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="canvas-element"
      />
      {isProcessing && (
        <div className="processing-overlay">
          <div className="spinner"></div>
          <p>Processing your voice command...</p>
        </div>
      )}
    </div>
  );
};

export default AnimationCanvas;