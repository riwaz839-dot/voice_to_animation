import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './VoiceRecorder.css';

const VoiceRecorder = ({ onProcessing, onVoiceProcessed }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [status, setStatus] = useState('Ready to record');
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const API_URL = 'http://localhost:5000/api';

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        setStatus('Recording saved');
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus('Recording...');
      
      // Start timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setRecordingTime(seconds);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setStatus('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
      setStatus('Processing recording...');
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setStatus('Ready to record');
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const sendToBackend = async () => {
    if (!audioBlob) return;

    onProcessing(true);
    setStatus('Processing voice command...');

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await axios.post(`${API_URL}/process-voice`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setStatus('Animation generated!');
        onVoiceProcessed(response.data);
      } else {
        setStatus('Error processing voice');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Server error');
      
      // Mock response for demo
      const mockResponse = {
        command: 'boy_playing_ball',
        confidence: 0.85,
        animation: {
          scene: "boy_playing_ball",
          elements: [],
          background: "#87CEEB"
        },
        audio_url: null
      };
      onVoiceProcessed(mockResponse);
    } finally {
      onProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-controls">
        {!isRecording ? (
          <button 
            className="record-btn"
            onClick={startRecording}
            disabled={isRecording}
          >
            <FaMicrophone /> Start Recording
          </button>
        ) : (
          <button 
            className="stop-btn"
            onClick={stopRecording}
          >
            <FaStop /> Stop Recording
          </button>
        )}

        {recordingTime > 0 && (
          <div className="timer">
            ⏱️ {formatTime(recordingTime)}
          </div>
        )}
      </div>

      {audioUrl && (
        <div className="recording-preview">
          <div className="preview-controls">
            <button onClick={playRecording} className="preview-btn">
              <FaPlay /> Play
            </button>
            <button onClick={clearRecording} className="delete-btn">
              <FaTrash /> Clear
            </button>
          </div>
          
          <audio src={audioUrl} controls className="audio-player" />
          
          <button 
            onClick={sendToBackend}
            className="process-btn"
            disabled={!audioBlob}
          >
            🎬 Generate Animation
          </button>
        </div>
      )}

      <div className="status-indicator">
        <div className={`status-dot ${isRecording ? 'recording' : 'idle'}`} />
        <span className="status-text">{status}</span>
      </div>

      <div className="hint">
        <p>💡 Try saying:</p>
        <ul>
          <li>"A boy is playing with a ball"</li>
          <li>"It is raining"</li>
          <li>"A cow is eating grass"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceRecorder;