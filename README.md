# 🚨 Med-Lynk

> **When you cannot speak for yourself, your medical history can.**

Med-Lynk is a mobile-first **Emergency Medical Profile** application designed to make critical medical information quickly accessible when a patient is unable to communicate.

## 💡 Problem

During an emergency, a patient may be unconscious or unable to communicate. Doctors and first responders may not immediately know critical information such as:

- Blood group
- Critical allergies
- Current medications
- Major medical conditions
- Previous serious reactions
- Major surgeries

## 🚀 Solution

Med-Lynk lets users describe their medical history using **voice or text**. AI structures the information, identifies missing details, and generates a short questionnaire. The completed profile receives a unique Emergency ID and QR code so a responder can access a limited emergency view.

### Core Flow

```text
Register/Login
      ↓
Medical History
      ↓
Voice/Text
      ↓
Speech-to-Text
      ↓
AI Structuring
      ↓
Smart Questionnaire
      ↓
User Confirmation
      ↓
Emergency Profile
      ↓
Emergency ID + QR
      ↓
Responder Scans QR
      ↓
Limited Critical Information
      ↓
Access Logged
```

## ✨ Key Features

- 🎤 Voice-based medical history
- 📝 Text fallback for reliable input
- 🧠 AI-powered medical information extraction
- ❓ Personalized smart questionnaire
- 🚨 Emergency-critical information dashboard
- 📱 QR-based emergency access
- 🔐 Limited emergency view for privacy
- 📝 Emergency access logging
- ✏️ Easy profile updates

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- PWA capabilities where practical

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication
- JWT
- bcrypt / bcryptjs

### AI
LLM integration for:
- Medical information extraction
- Structured medical data
- Missing-information identification
- Questionnaire generation

### Speech
Browser/device speech-to-text for the MVP, with text fallback.

### QR
React QR-code library.

### Deployment
- Frontend: Vercel
- Backend: Render or equivalent
- Database: MongoDB Atlas

## 🏗️ Architecture

```text
                    ┌───────────────────┐
                    │   React / PWA     │
                    │   Mobile UI       │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
                    ┌─────────▼─────────┐
                    │ Node.js / Express │
                    │      Backend      │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼────────────────┐
              ↓               ↓                ↓
        ┌──────────┐    ┌──────────┐    ┌────────────┐
        │ MongoDB  │    │ AI / LLM │    │ Speech-to- │
        │  Atlas   │    │  Layer   │    │    Text    │
        └──────────┘    └──────────┘    └────────────┘
                              │
                              ↓
                    Emergency Profile
                              │
                              ↓
                           QR Code
                              │
                              ↓
                       Emergency View
```

## 📁 Project Structure

```text
med-lynk/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install:
- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Git

Check installation:

```bash
node -v
npm -v
```

### Clone

```bash
git clone <YOUR_REPOSITORY_URL>
cd med-lynk
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

In another terminal:

```bash
cd server
npm install
npm run dev
```

If no development script exists:

```bash
node src/server.js
```

## 🔐 Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
CLIENT_URL=http://localhost:5173
```

**Never commit `.env` or API keys to GitHub.**

Recommended `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

## 🔌 API Overview

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Medical Profile

```http
GET    /api/profile
POST   /api/profile
PUT    /api/profile
```

### AI

```http
POST /api/ai/extract
POST /api/ai/questions
```

### Emergency

```http
GET /api/emergency/:emergencyId
```

### Access Logs

```http
GET /api/emergency/:emergencyId/logs
```

## 🗄️ Main Data Models

### User

```text
_id
name
email
password
createdAt
```

### MedicalProfile

```text
userId
emergencyId
bloodGroup
allergies[]
medications[]
conditions[]
surgeries[]
medicalEvents[]
emergencyNotes[]
emergencyContact
createdAt
updatedAt
```

### AccessLog

```text
emergencyId
accessedAt
accessType
```

## 🔒 Security Principles

- Hash passwords with bcrypt.
- Protect authenticated APIs with JWT.
- Store secrets in environment variables.
- Never commit `.env`.
- Use CORS and Helmet.
- Validate incoming data.
- Separate normal profile access from emergency access.
- Expose only limited critical information through the emergency endpoint.
- Record emergency access events.
- Do not allow AI to invent medical information.

> **Important:** This is a hackathon prototype, not a certified medical-record system or a substitute for professional medical judgment.

## 🎬 Hackathon Demo

```text
Patient cannot communicate
          ↓
Doctor needs critical information
          ↓
Med-Lynk profile already exists
          ↓
AI structures medical history
          ↓
User confirms missing information
          ↓
Emergency profile is created
          ↓
QR code is generated
          ↓
Responder scans QR
          ↓
Critical information appears
          ↓
Access is logged
```

## ⏱️ MVP Priority

### 🔴 P0 — Must Work
- Registration
- Login
- Medical Profile
- MongoDB
- Emergency Profile
- Emergency ID
- QR code
- Public emergency view

### 🟠 P1 — Core Innovation
- AI extraction
- Voice input
- Smart questionnaire

### 🟡 P2 — Important
- Access logging
- Mobile UI polish
- Deployment
- Error handling

### 🟢 P3 — Future Scope
- Hospital EMR integration
- Ambulance/CAD integration
- Wearables
- NFC
- Multilingual voice input
- GPS emergency notifications
- Medication reminders
- Verified digital health records

## 🌐 Deployment

### Frontend
Deploy to Vercel.

### Backend
Deploy the Node.js/Express API to Render or another suitable Node.js hosting provider.

### Database
Use MongoDB Atlas.

After deployment, test:

```text
Production URL
      ↓
Login
      ↓
Create Profile
      ↓
Generate QR
      ↓
Scan QR from another device
      ↓
Emergency View
```

## 🔮 Future Scope

The current MVP focuses on emergency access. Future versions may explore:

- Hospital EMR integration
- Ambulance/CAD integration
- Smartwatch and NFC medical IDs
- Multilingual voice input
- Medication reminders
- Preventive health alerts
- Automated emergency-contact notifications
- GPS-based emergency notifications
- Verified digital health records

## 👥 Team Rules

1. Build the complete end-to-end flow first.
2. Keep the app mobile-first.
3. Commit working code frequently.
4. Do not block the whole team on one feature.
5. Keep manual/text fallbacks for AI and speech.
6. Fix critical bugs before adding features.
7. Do not build future-scope features before the MVP works.
8. Keep secrets out of GitHub.

## ❤️ Vision

Med-Lynk aims to reduce uncertainty during emergencies by making critical medical context available when the patient cannot communicate.

> **Faster Access. Less Uncertainty. Better Safety. Patient-Centered.**

## 📄 Project Information

**Project:** Med-Lynk  
**Track:** Healthcare & MedTech  
**Type:** Hackathon MVP  
**Focus:** Emergency Medical Profile + AI Structuring + Emergency QR Access

## ⚠️ Disclaimer

Med-Lynk is a hackathon prototype intended to demonstrate a concept. Medical information should be reviewed and confirmed by the user, and the application should not be relied upon as the sole source of medical information in an emergency.
