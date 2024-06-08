# TODO API

This project is a TODO API that allows users to create, read, update, and delete todo items. It also includes user authentication features.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
    - [Signup](#signup)
    - [Login](#login)
  - [Todo Routes](#todo-routes)
    - [Create a Todo](#create-a-todo)
    - [Create Multiple Todos](#create-multiple-todos)
    - [Get All Todos](#get-all-todos)
    - [Update a Todo](#update-a-todo)
    - [Delete a Todo](#delete-a-todo)
    - [Delete Multiple Todos](#delete-multiple-todos)
    - [Search Todos](#search-todos)
- [Middlewares](#middlewares)
- [Running the Project](#running-the-project)
- [License](#license)

## Features

- User authentication (signup, login)
- Create, read, update, delete todo items
- Fetch todos specific to a user

## Requirements

- Node.js
- Express
- MongoDB
- JWT
- bcrypt
- dotenv
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Niloyns/Todo_API
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/todoapi
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

**_User Authentication_**

- `POST /signup` **For Singup/Registation User**
- `POST /login` **For Login User**

**_Todo Routes_**

- `POST /todo` **Create a new todo**
- `POST /todo/all` **Create multiple todos**
- `GET /todo` **Get all todos**
- `GET /todo/search` **Search todos by title `/todo/search?todo=search`**
- `PUT /todo/:id` **Update a todo**
- `DELETE /todo/:id` **Delete a todo**
- `POST /todo/deleteMany` **Delete multiple todos**
- `GET /todo/search` **Search todos**

### Authentication Routes

- **Signup**

  ```http
  POST /signup
  ```

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "message": "User registered successfully"
  }
  ```

- **Login**

  ```http
  POST /login
  ```

  **Request Body:**

  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Todo Routes

All todo routes require a valid JWT token to be passed in the `Authorization` header.

- **Create a Todo**

  ```http
  POST /todo
  ```

  **Request Body:**

  ```json
  {
    "title": "New Todo",
    "description": "Todo description"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Todo created successfully"
  }
  ```

- **Create Multiple Todos**

  ```http
  POST /todo/all
  ```

  **Request Body:**

  Ensure your request body is an array of todo objects like this:

  ```json
  [
    {
      "title": "Todo 1",
      "description": "Description 1"
    },
    {
      "title": "Todo 2",
      "description": "Description 2"
    }
  ]
  ```

  **Response:**

  ```json
  {
    "message": "Successfully inserted multiple todos"
  }
  ```

- **Get All Todos**

  ```http
  GET /todo
  ```

  **Response:**

  ```json
  {
    "todos": [
      {
        "title": "Todo 1",
        "description": "Description 1",
        "user": {
          "name": "John Doe",
          "username": "johndoe"
        }
      },
      {
        "title": "Todo 2",
        "description": "Description 2",
        "user": {
          "name": "John Doe",
          "username": "johndoe"
        }
      }
    ]
  }
  ```

- **Update a Todo**

  Find the todo by ID from the request parameters

  ```http
  PUT /todo/:id
  ```

  **Request Body:**

  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Todo updated successfully"
  }
  ```

- **Delete a Todo**

  Find the todo by ID from the request parameters

  ```http
  DELETE /todo/:id
  ```

  **Response:**

  ```json
  {
    "message": "Todo deleted successfully"
  }
  ```

- **Delete Multiple Todos**

  Find the many todo by multiple ID from the request parameters

  ```http
  POST /todo/deleteMany
  ```

  **Request Body:**

  ```json
  {
    "ids": ["id1", "id2", "id3"]
  }
  ```

  **Response:**

  ```json
  {
    "message": "X todos deleted"
  }
  ```

- **Search Todos**

  ```http
  GET /todo/search?title=searchTerm
  ```

  **Response:**

  ```json
  {
    "todos": [
      {
        "title": "Searched Todo",
        "description": "Description of searched todo"
      }
    ]
  }
  ```

## Middlewares

- **verifyToken**

  This middleware checks if the request has a valid JWT token.

  ```javascript
  const jwt = require("jsonwebtoken");

  const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };

  module.exports = verifyToken;
  ```

## Running the Project

To run the project, ensure that MongoDB is running on your machine, then start the server using:

```bash
npm start
```
