# 📧 Email Reply Generator (Frontend)

This is a simple and responsive **Email Reply Generator** built with **React** and **Material UI (MUI)**. It allows users to input an email and select a desired tone (e.g., professional, casual, friendly), then communicates with a backend API to generate a context-aware reply.

---

## Features

- Input your email content
- Choose a tone for the reply (optional)
- Generate a suggested reply via backend API
- Copy the reply to your clipboard with one click
- Smooth UX with loading indicators and error handling

---

## Install dependencies
- npm install

## Run UI
- npm run dev

## Make sure the backend is running at:
- http://localhost:8080/api/email/generate

## Tech Stack

Frontend: React + Vite

UI: Material UI (MUI)

HTTP Client: Axios

## To Do / Future Improvements

 Add dark mode toggle

 Add tone detection using AI

 Improve loading experience with skeleton UI

 Deploy to Vercel / Netlify

 # 📧 Smart Email Assistant (Backend)

This is the backend service for the **Smart Email Assistant**, a Spring Boot application that leverages the **Gemini API** to generate professional email replies based on input email content and desired tone.

## 🚀 Features

- Generate professional AI-based email responses
- Customize tone (e.g., formal, casual, friendly)
- Integration with Gemini AI API
- RESTful endpoint to process email content

## 🧱 Tech Stack

- Java 17+
- Spring Boot
- WebClient (Spring WebFlux)
- Gemini API

# 📬 Smart Email Assistant – Chrome Extension

This Chrome Extension enhances your Gmail experience by injecting an AI-powered "Generate Reply" button directly into Gmail's compose window. It connects to a local Spring Boot backend that uses the Gemini API to generate professional email responses based on the email content and selected tone.

---

## 🚀 Features

- Generate AI-based email replies with one click
- ✉️ Seamlessly integrates with Gmail
- Customizes tone (e.g., professional, casual)
- 🌐 Sends request to a local Spring Boot backend API

---

## 🧰 Technologies Used

- **JavaScript** (Vanilla)
- **MutationObserver** for dynamic UI injection
- **Gmail DOM manipulation**
- **Fetch API** for backend communication