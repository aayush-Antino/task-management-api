# Task Management API

A RESTful API for managing tasks with user authentication and role-based access control.

## 🚀 Technologies

- **Node.js** & **Express** - Backend framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** (JSON Web Tokens) - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Request validation

## 📂 Project Structure

```
task-management-api/
├── src/
│   ├── db/                 # Database connection config
│   ├── docs/               # Swagger documentation config
│   ├── middleware/         # Custom middleware (Auth, Validation, etc.)
│   ├── routes/             # Route aggregators
│   ├── utils/              # Utility functions (JWT, Helper)
│   ├── v1/                 # API Version 1
│   │   └── components/     # Feature-based modules (Auth, Tasks, Users)
│   │       ├── auth/       # Auth controller, service, routes, validator
│   │       ├── tasks/      # Tasks controller, service, routes, validator
│   │       └── users/      # Users controller, service, routes, validator
│   └── app.js              # Express app setup
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── server.js               # Entry point
└── README.md               # Project documentation
```

## ⚙️ Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aayush-Antino/task-management-api.git
    cd task-management-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_access_token_secret
    JWT_REFRESH_SECRET=your_refresh_token_secret
    ```

4.  **Start the server**
    ```bash
    npm start
    ```

## 🔌 API Endpoints

### Authentication

-   `POST /api/v1/auth/register` - Register a new user
-   `POST /api/v1/auth/login` - Login and receive tokens
-   `POST /api/v1/auth/refresh` - Refresh access token
-   `POST /api/v1/auth/logout` - Logout user

### Users

-   `GET /api/v1/users/me` - Get current user profile
-   `GET /api/v1/users` - Get all users (Admin only)
-   `PATCH /api/v1/users/:userId/role` - Update user role (Admin only)
-   `DELETE /api/v1/users/:userId` - Delete user (Admin only)

### Tasks

-   `GET /api/v1/tasks` - Get all tasks (Supports filtering by status, priority, search)
-   `POST /api/v1/tasks` - Create a new task
-   `GET /api/v1/tasks/:taskId` - Get distinct task details
-   `PUT /api/v1/tasks/:taskId` - Update a task
-   `DELETE /api/v1/tasks/:taskId` - Delete a task
-   `GET /api/v1/tasks/stats` - Get task statistics

## 🛡️ Security

-   **Authentication**: Bearer Token (JWT) required for protected routes.
-   **Authorization**: Role-based access control (User/Admin).
-   **Data Validation**: Strict input validation using `express-validator`.
