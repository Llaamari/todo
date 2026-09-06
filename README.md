# Todo Application

A full-stack Todo application created as part of the React course exercises at Oulu University of Applied Sciences.

The project was developed step by step, starting from a simple React Todo application and extending it with a Node.js/Express backend, PostgreSQL database, automated tests, user authentication, protected routes and an MVC-style backend architecture.

## Features

- View Todo tasks
- Add new tasks
- Delete tasks
- Persistent task storage with PostgreSQL
- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected frontend routes
- Protected API operations
- Session storage for logged-in user information
- Automated backend tests
- Separate development and test databases
- MVC-style backend structure

## Technologies

### Frontend

- React
- Vite
- React Router
- Axios
- JavaScript
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)
- dotenv

### Testing

- Mocha
- Chai
- cross-env

## Project Structure

```text
todo/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   └── Row.jsx
│   ├── context/
│   │   ├── UserContext.js
│   │   ├── UserProvider.jsx
│   │   └── useUser.js
│   ├── screens/
│   │   ├── Authentication.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── controllers/
│   │   └── TaskController.js
│   ├── helper/
│   │   ├── ApiError.js
│   │   ├── auth.js
│   │   ├── db.js
│   │   └── test.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   ├── todoRouter.js
│   │   └── userRouter.js
│   ├── db.sql
│   ├── index.js
│   └── index.test.js
│
├── .env
├── package.json
└── README.md
```

## MVC Architecture

The Todo backend follows a simple Model-View-Controller style architecture.

### Model

`server/models/Task.js`

The model handles PostgreSQL database operations and SQL queries, such as:

- Selecting tasks
- Inserting tasks
- Deleting tasks

### Controller

`server/controllers/TaskController.js`

The controller handles:

- Request data
- Validation
- HTTP status codes
- Calling the model
- Passing errors to the error middleware

### Router

`server/routes/todoRouter.js`

The router connects API endpoints to controller functions and applies authentication middleware to protected operations.

Because the backend is a REST API, JSON responses act as the representation returned to the client.

## Database

The application uses PostgreSQL.

Two databases are used:

- `todo` – development database
- `test_todo` – automated testing database

The database contains the following tables:

### task

Stores Todo tasks.

```text
id
description
```

### account

Stores registered users.

```text
id
email
password
```

Passwords are not stored as plain text. They are hashed using bcrypt.

The database structure can be initialized using:

```text
server/db.sql
```

## Environment Variables

The backend uses environment variables for database configuration and JWT authentication.

Example backend `.env` configuration:

```env
DB_USER=your_postgresql_user
DB_HOST=localhost
DB_NAME=todo
TEST_DB_NAME=test_todo
DB_PASSWORD=your_postgresql_password
DB_PORT=5432

JWT_SECRET_KEY=your_secret_key
```

The actual `.env` file should not be committed to Git.

The frontend uses:

```env
VITE_API_URL=http://localhost:3001
```

## Authentication

Users can create an account and sign in to the application.

Passwords are hashed using bcrypt before they are stored in PostgreSQL.

After successful login, the backend returns a JWT token. The frontend stores the logged-in user information in `sessionStorage`.

Protected API requests send the token using the HTTP Authorization header:

```text
Authorization: Bearer <token>
```

Creating and deleting tasks require authentication.

The Todo page is also protected on the frontend using React Router and `ProtectedRoute`.

## API Endpoints

### Tasks

```text
GET /tasks
```

Returns all tasks.

```text
POST /tasks
```

Creates a new task. Requires authentication.

Example request body:

```json
{
  "task": {
    "description": "New task"
  }
}
```

```text
DELETE /tasks/:id
```

Deletes a task. Requires authentication.

### Users

```text
POST /users/signup
```

Creates a new user.

Example:

```json
{
  "user": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

```text
POST /users/signin
```

Authenticates a user and returns a JWT token.

## Running the Application

### Backend

Open a terminal in the `server` directory and run:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:3001
```

### Frontend

Open another terminal in the frontend project directory and run:

```bash
npm run dev
```

Vite will display the frontend URL in the terminal.

Both the frontend and backend must be running for the complete application to work.

## Running Tests

The project includes automated backend tests for task operations and user authentication.

First start the backend using the test environment:

```bash
npm run start:test
```

Then open another terminal in the `server` directory and run:

```bash
npm test
```

The tests use the separate `test_todo` PostgreSQL database.

## Error Handling

The backend uses common Express error-handling middleware.

A custom `ApiError` class is also used for errors that need an HTTP status code, for example:

```js
new ApiError('Task description is required', 400)
```

Errors are returned to the client as JSON.

## Course Exercise

This application was developed through eight Todo exercise parts. During the exercises, the project was gradually extended from a basic React application into a full-stack application with database persistence, testing, authentication, protected routes and an MVC-style backend architecture.