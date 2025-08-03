# Todo App API

A RESTful API for managing tasks with user authentication. This Node.js application uses Express.js, MongoDB with Mongoose, and JWT for authentication.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Full CRUD operations for tasks
- **Data Validation**: Input validation using Joi
- **Error Handling**: Centralized error handling with custom ApiError class
- **Logging**: Winston for logging
- **Environment Configuration**: Dotenv for environment variables

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Bcryptjs**: Password hashing
- **Joi**: Data validation
- **Winston**: Logging
- **Cors**: Cross-origin resource sharing
- **Dotenv**: Environment variables

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Tasks (Authentication required)
- `GET /api/v1/tasks` - Get all tasks for the authenticated user
- `POST /api/v1/tasks` - Create a new task
- `PUT /api/v1/tasks/:id` - Update a task (mark as completed)
- `DELETE /api/v1/tasks/:id` - Delete a task

## Request/Response Examples

### Register User
**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "email": "john@example.com",
      "fullName": "John Doe",
      "id": "60d9f9b1e4b0f84b8c8b4567"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Task
**Request:**
```json
{
  "name": "Buy groceries"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "60d9f9b1e4b0f84b8c8b4568",
    "name": "Buy groceries",
    "completed": false,
    "userId": "60d9f9b1e4b0f84b8c8b4567",
    "createdAt": "2023-06-28T10:00:00.000Z",
    "updatedAt": "2023-06-28T10:00:00.000Z"
  }
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key_here
```

### Running the Application
- **Development**: `npm run dev`
- **Production**: `npm start`

The server will run on `http://localhost:3000`

## Project Structure
```
src/
├── controllers/        # Route controllers
├── models/            # Mongoose models
├── routes/            # API routes
├── services/          # Business logic
├── middlewares/       # Express middlewares
├── validations/       # Request validation schemas
├── utils/            # Utility functions and classes
├── app.js            # Express app configuration
└── index.js          # Server entry point
```

## Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGODB_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## License
This project is licensed under the MIT License.