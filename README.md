# 🎙️ AI-Driven Voice Narrative to Animated Video Conversion System

> **Transform your voice into an animated story.**

An AI-powered **Voice-to-Animation System** that converts natural voice narratives into animated videos. The system processes spoken input through speech recognition and natural language processing, extracts entities and actions, generates character motion using a **Motion Variational Autoencoder (Motion VAE)**, and renders the result as a synchronized 2D animation.

This project was developed as a major project for the **Bachelor's Degree in Computer Engineering** at **Himalaya College of Engineering, Tribhuvan University, Nepal**.

---

## ✨ Features

* 🎤 **Voice Input**

  * Record voice directly through the browser
  * Upload audio input

* 📝 **Speech-to-Text**

  * Converts spoken narration into text
  * Uses speech recognition and MFCC-based processing

* 🧠 **Natural Language Processing**

  * Extracts entities, subjects, objects, and actions
  * Uses **BiLSTM with Attention**
  * Supports action classification across 22 classes

* 🎬 **AI Motion Generation**

  * Uses a **Motion Variational Autoencoder (Motion VAE)**
  * Generates skeletal motion sequences
  * Uses a 128-dimensional latent representation

* 🐄 **2D Animation**

  * Converts generated skeletal motion into sprite-based animation
  * Uses HTML5 Canvas for browser rendering

* 🔊 **Audio Synchronization**

  * Synchronizes narration/audio with generated animation

* 🎥 **Video Output**

  * Produces animated video output
  * Supports MP4-based final content

* ▶️ **Playback Controls**

  * Play
  * Pause
  * Reset
  * Download

* ⚠️ **Error Handling**

  * Empty input validation
  * Long-input handling
  * Backend connection error handling

---

## 🧩 System Architecture

The system follows a modular pipeline:

```text
                ┌──────────────────┐
                │   Voice Input    │
                │ Record / Upload  │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Speech-to-Text   │
                │   ASR + MFCC     │
                │     + BiLSTM     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │       NLP        │
                │ Entity & Action  │
                │    Extraction    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Scene Graph    │
                │   Construction   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Motion VAE     │
                │ Motion Generation│
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │  2D Rendering    │
                │  Canvas / Sprite │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Audio Sync &     │
                │ Video Composition│
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │  Animated Video  │
                │      MP4         │
                └──────────────────┘
```

The project's documented workflow consists of six major stages: voice input/transcription, NLP and scene extraction, scene graph construction, animation/environment generation, audio handling/synthesis, and video rendering/output composition.

---

## 🛠️ Technology Stack

### Backend

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| **Python 3.8+**   | Backend and AI development             |
| **PyTorch 2.1.0** | Deep learning models                   |
| **Flask 3.0.0**   | REST API and backend services          |
| **NumPy**         | Numerical and motion-data processing   |
| **SciPy**         | Signal processing and motion smoothing |
| **scikit-learn**  | Model evaluation and metrics           |

The backend uses Python, PyTorch, and Flask for AI model development, inference, and REST API communication.

### AI / Machine Learning

* Automatic Speech Recognition (ASR)
* MFCC feature extraction
* BiLSTM
* Attention Mechanism
* Multi-task classification
* Motion Variational Autoencoder (Motion VAE)
* Forward Kinematics
* Reparameterization Trick

The NLP model uses BiLSTM with Attention, while Motion VAE is used as the core motion synthesis engine.

### Frontend

* HTML5
* CSS3
* JavaScript
* Web Speech API
* MediaDevices API
* Canvas API

The Canvas API renders the generated motion as 2D sprites frame-by-frame in the browser.

### Animation & Audio

* HTML5 Canvas
* 2D Sprite Animation
* Pygame
* MoviePy
* Pydub
* Blender
* Unity

Blender and Unity were primarily used for rigging/validation, while the final system focuses on lightweight 2D rendering.

---

## 🔄 How It Works

### 1. Voice Input

The user records a voice narrative or uploads an audio file.

### 2. Speech Recognition

The audio is processed by the speech-recognition pipeline and converted into text.

MFCC features are used as speech representations, with temporal information captured through BiLSTM-based processing.

### 3. NLP Processing

The generated text is analyzed to identify:

* Characters
* Objects
* Actions
* Scenes
* Relationships

For example:

```text
Input:
"The cow is eating grass."

Output:
Subject: Cow
Action: Eating
Object: Grass
```

### 4. Motion Generation

The recognized action is passed to the Motion VAE.

The model generates a skeletal motion sequence from the learned latent representation. The documented implementation represents motion using sequences of frames, joints, and coordinates.

### 5. Animation Rendering

Generated motion is processed and converted into 2D sprite movement using the Canvas API.

### 6. Audio Synchronization

The original or synthesized audio is synchronized with the generated animation.

### 7. Final Output

The completed animated story is rendered and made available for playback and download.

---

## 📊 Model Performance

The project report documents the following experimental results:

| Metric                               |     Result |
| ------------------------------------ | ---------: |
| Action Classification Accuracy       |  **95.1%** |
| Overall ASR Error Rate               |   **8.5%** |
| Motion Reconstruction Loss Reduction |    **78%** |
| Joint Position Error                 | **1.2 cm** |
| End-to-End Latency                   | **973 ms** |
| Functional Test Cases Passed         |  **12/12** |

## The reported end-to-end latency is approximately **973 ms**, with motion generation accounting for the largest portion of processing time.

## 🎓 Target Application

The system is primarily designed as an **interactive educational tool for children aged 5–12**, particularly for creating animal-based animated stories through voice input.

### Example

A child can say:

> **"A cow is eating grass on the farm."**

The system can interpret the narration and generate an animation containing:

```text
Cow
 ↓
Eating
 ↓
Grass
 ↓
Farm Environment
 ↓
Animated Output
```

---

## 🌍 Potential Applications

* 📚 **Education**
* 🎭 **Interactive Storytelling**
* 🎥 **Content Creation**
* 📱 **Social Media Animation**
* 📢 **Digital Marketing**
* ♿ **Accessibility Tools**
* 🤖 **Virtual Assistants and Avatars**

The project identifies education, entertainment, digital marketing, accessibility, and interactive avatars as potential application areas.

---

## 📁 Project Structure

A suggested repository structure is:

```text
Voice-To-Animation/
│
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── nlp_model/
│   │   └── motion_vae/
│   ├── routes/
│   ├── utils/
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│       ├── characters/
│       ├── backgrounds/
│       └── animations/
│
├── datasets/
│   ├── nlp/
│   └── motion/
│
├── notebooks/
│
├── models/
│
├── outputs/
│
├── README.md
└── .gitignore
```

> Adjust the structure above to match the actual folders in your repository.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/riwaz839-dot/voice_to_animation.git
cd voice_to_animation
```

### 2. Create a Virtual Environment

```bash
python -m venv env
```

Activate it on Windows:

```powershell
.\env\Scripts\Activate.ps1
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Backend

```bash
python app.py
```

The Flask backend will start on the configured local port.

### 5. Open the Frontend

Open the frontend application in your browser or run it using the project's configured frontend development server.

---

## 🧪 Testing

The system was tested across:

* Voice input
* Speech recognition
* NLP classification
* Animation generation
* Multi-event stories
* Playback controls
* Download functionality
* Empty input handling
* Long input handling
* Backend failure handling

The documented functional testing reported that all **12 functional test cases passed validation**.

---

## ⚠️ Limitations

The current version has several limitations:

* Supports **2D animation** rather than full 3D rendering
* Focuses on **animal characters**
* Current input language is **English**
* Advanced facial expressions are not implemented
* Complex emotional expressions are limited
* Voice inputs longer than **2 minutes** are not supported
* Some ASR errors occur with background noise, accents, and rapid speech
* Complex actions may produce occasional motion artifacts

These limitations are documented in the project scope and testing results.

---

## 🚀 Future Improvements

Possible future improvements include:

* 🌐 Multilingual voice support
* 🧑 Human character animation
* 🎭 Better emotional expression
* 🎬 More complex multi-character stories
* 🧠 Transformer-based NLP models
* 🎨 More diverse animation assets
* ⚡ GPU-optimized motion generation
* 📱 Mobile-friendly application

---

## 👥 Team

### Himalaya College of Engineering

**Tribhuvan University — Institute of Engineering**

**Department of Electronics & Computer Engineering**


**Riwaz Rayamajhi**    



**Project:** Bachelor of Computer Engineering
**Year:** 2026
**Location:** Lalitpur, Nepal



---

## 📄 Project Documentation

The complete academic project report contains the system design, methodology, AI/ML algorithms, testing, performance analysis, limitations, and future work.

---

## 📜 License

This project was developed for academic and educational purposes.

If you intend to reuse the source code, models, datasets, or third-party assets, please verify their respective licenses and usage conditions.

---

## ⭐ Acknowledgements

We would like to thank **Himalaya College of Engineering**, the Department of Electronics & Computer Engineering, our project supervisor, coordinators, faculty members, and everyone who supported the development and evaluation of this project.

---

## 💡 Project Idea

> **Speak a story. Let AI bring it to life. 🎙️ → 🧠 → 🎬**

---
