# VoiceOwl API - Transcription Service

A minimal backend service built using **Node.js**, **TypeScript**, **Express**, and **MongoDB**, designed to simulate audio transcription via an API.

---

## Features

- Accepts audio URLs for transcription
- Mocks transcription (returns dummy "transcribed text")
- Stores audioUrl, transcription, and createdAt timestamp in MongoDB
- Exposes routes to:
  - Create a transcription
  - Fetch all transcriptions
  - Fetch a single transcription by ID
  - Delete a transcription
- Integrated Swagger UI for API documentation
- Logging using Winston (to console + file)

---

## Code Structure

src/
├── config/
│   └── db.ts                    # MongoDB connection setup
├── controllers/
│   └── transcription.controller.ts  # Route logic (POST endpoint)
├── models/
│   └── transcription.model.ts  # Mongoose model
├── routes/
│   └── transcription.routes.ts # Express route definitions
├── services/
│   └── transcription.service.ts    # Business logic for transcription
├── utils/
│   ├── logger.ts               # Winston logger setup
│   └── download.util.ts       # Audio file download utility
├── types/
│   └── transcription.types.ts # TypeScript interfaces
├── swagger.ts                 # Swagger documentation setup
├── app.ts                     # Express app config and middleware
└── server.ts                  # App bootstrap and listener


| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/transcription`     | Submit audio URL for transcription |
| GET    | `/transcription/all` | Fetch all transcriptions           |
| GET    | `/transcription/:id` | Fetch transcription by ID          |
| DELETE | `/transcription/:id` | Delete transcription by ID         |


instruction to run this 

1.Create a .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/backend

2.Install dependencies

npm install

3.Run the application

npm run dev

4.Access Swagger API Docs

Go to: http://localhost:5000/api-docs/


📄 Logging
Implemented via winston. Logs go to:

Console (all levels)

File: logs/combined.log , logs/error.log


Assumptions Made

Transcription is simulated by returning a static string "transcribed text".
No file size validation or audio format check is done at this stage.



🛠️ Improvements for Production-Grade System

1.Use a real speech-to-text engine (e.g., Whisper,Open Api)

2.Add audio file validation (format, size, duration)

3.Use a queue system (like BullMQ) for async transcription jobs

4.Add request validation (e.g., using Zod or Joi)

5.Add authentication & rate limiting

6.Add unit and integration tests with Jest and Supertest

7.Centralized error handling middleware

8.Enable file uploads via multipart/form-data (in addition to URL-based)