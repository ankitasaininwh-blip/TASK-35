# Workout Buddy – MERN Stack Application

## 📌 Project Overview

Workout Buddy is a full-stack workout tracking application built using the MERN stack. It allows users to add, view, and delete workout records. Workout data is stored in MongoDB and managed through a REST API built with Express.js and Node.js.

## ✨ Features

- Add new workouts.
- View all saved workouts.
- Delete existing workouts.
- Store workout details in MongoDB.
- Track exercise title, weight/load in kilograms, and repetitions.
- Validate workout input before saving.
- Display workout creation timestamps.
- Responsive user interface.
- React Context API for managing workout state.
- REST API integration between frontend and backend.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- React Context API

### Backend
- Node.js
- Express.js
- Mongoose
- REST API

### Database
- MongoDB Atlas

## 📂 Project Structure

```text
ankita_task-35/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── workoutController.js
│   ├── models/
│   │   └── Workout.js
│   ├── routes/
│   │   └── workoutRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── WorkoutContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git (optional)

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ankita_task-35
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Configure the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```

Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string.

Start the backend server:

```bash
node server.js
```

The backend runs at:

`http://localhost:5000`

### 3. Configure the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal. By default, Vite commonly uses:

`http://localhost:5173`

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api/workouts`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/workouts` | Retrieve all workouts |
| POST | `/api/workouts` | Create a new workout |
| DELETE | `/api/workouts/:id` | Delete a workout by ID |

### Example Workout Object

```json
{
  "title": "Bench Press",
  "load": 40,
  "reps": 12
}
```

## 🗄️ Database Schema

Each workout contains the following fields:

| Field | Type | Description |
|---|---|---|
| `title` | String | Exercise name |
| `load` | Number | Weight/load in kilograms |
| `reps` | Number | Number of repetitions |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

Mongoose automatically manages the timestamps.

## 🔐 Environment Variables

The backend uses environment variables for configuration.

- `MONGO_URI`: MongoDB connection string.
- `PORT`: Backend server port (5000 by default).

**Security:** Never upload your `.env` file or database credentials to a public GitHub repository. Add `.env` to `.gitignore`.

## 🧪 Testing

1. Start the backend server.
2. Start the frontend development server.
3. Open the application in your browser.
4. Add a workout with a title, load, and reps.
5. Verify that the workout appears in the list.
6. Refresh the page and confirm that the saved workout remains.
7. Delete a workout and verify that it is removed.

## 🎯 Learning Outcomes

This project demonstrates:

- Building a React frontend.
- Creating RESTful APIs using Express.js.
- Connecting a Node.js backend to MongoDB.
- Defining database schemas with Mongoose.
- Managing application state using React Context.
- Performing CRUD operations.
- Handling API errors and validating user input.

