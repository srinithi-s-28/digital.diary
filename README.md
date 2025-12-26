# Digital Diary - MERN Stack Application

A full-stack web application for personal diary management with user authentication, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### Diary Management
- Create diary entries with title, content, mood, and date
- View all personal diary entries
- Edit existing entries
- Delete entries
- Mood tracking (happy, sad, excited, angry, neutral, anxious)

### UI/UX
- Responsive design
- Clean, diary-style interface
- Navigation with logout functionality
- Form validation and error handling

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

<<<<<<< HEAD
## Project Structure

```
digital-diary/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── DiaryCard.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── AddDiary.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Diary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── diaryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── diaryRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd digital-diary/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - Update the `.env` file with your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/digital-diary
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Ensure your connection string is correct

5. **Run the backend server:**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd digital-diary/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

### Running the Complete Application

1. **Start Backend:** In one terminal, run the backend server
2. **Start Frontend:** In another terminal, run the React app
3. **Access Application:** Open `http://localhost:3000` in your browser

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Diary Endpoints (Protected)

#### Create Diary Entry
- **POST** `/api/diary`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "My First Day",
    "content": "Today was amazing...",
    "mood": "happy",
    "date": "2023-12-01"
  }
  ```

#### Get All Diary Entries
- **GET** `/api/diary`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "diaries": [
      {
        "_id": "diary_id",
        "title": "My First Day",
        "content": "Today was amazing...",
        "mood": "happy",
        "date": "2023-12-01T00:00:00.000Z",
        "user": "user_id",
        "createdAt": "2023-12-01T10:00:00.000Z",
        "updatedAt": "2023-12-01T10:00:00.000Z"
      }
    ]
  }
  ```

#### Update Diary Entry
- **PUT** `/api/diary/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create diary entry

#### Delete Diary Entry
- **DELETE** `/api/diary/:id`
- **Headers:** `Authorization: Bearer <token>`

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Diary Schema
```javascript
{
  title: String (required),
  content: String (required),
  mood: String (enum: ['happy', 'sad', 'excited', 'angry', 'neutral', 'anxious']),
  date: Date (default: now),
  user: ObjectId (ref: 'User', required),
  timestamps: true
}
```

## Usage Guide

1. **Registration:** Create a new account with name, email, and password
2. **Login:** Sign in with your credentials
3. **Dashboard:** View all your diary entries
4. **Add Entry:** Click "Add New Entry" to create a diary entry
5. **Edit Entry:** Click "Edit" on any diary card to modify it
6. **Delete Entry:** Click "Delete" to remove an entry (with confirmation)
7. **Logout:** Use the logout button in the navigation bar

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

## Development Notes

- The application uses MVC architecture in the backend
- Frontend implements protected routes for authenticated users
- Responsive design works on desktop and mobile devices
- Error handling implemented throughout the application
- Environment variables used for sensitive configuration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **CORS Issues:**
   - Verify backend CORS configuration
   - Check if frontend is running on correct port

3. **Authentication Issues:**
   - Clear localStorage and try logging in again
   - Check if JWT_SECRET is set in backend `.env`

4. **Port Conflicts:**
   - Backend default: 5000
   - Frontend default: 3000
   - Change ports if needed in respective configurations

## Future Enhancements

- Image upload for diary entries
- Search and filter functionality
- Export diary entries to PDF
- Dark mode theme
- Email notifications
- Social sharing features

## License

This project is open source and available under the MIT License.
=======

This project is open source and available under the MIT License.
>>>>>>> 23b1d0199d2f70e449baf4a820eb22cd83d58e22
