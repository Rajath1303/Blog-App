# MERN Blog App

A full-stack blog application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This app allows users to create, read, update, and delete blog posts. It also features user authentication and authorization using JWT tokens.

## Features

- **User Authentication**: Register and login using email and password.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Responsive Design**: Mobile-friendly UI built with React and CSS.
- **JWT Authentication**: Secure authentication with JSON Web Tokens.
- **MongoDB**: Data storage and management using MongoDB.

## Technologies Used

- **MongoDB**: NoSQL database for storing blog posts and user data.
- **Express.js**: Web framework for building the backend RESTful API.
- **React**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for backend server-side logic.
- **JWT**: Secure token-based authentication.
- **Axios**: Promise-based HTTP client for making requests from React.

## Setup and Installation

Clone the repository.
   ```bash
   git clone https://github.com/](https://github.com/Rajath1303/Blog-App.git
  ```
### Backend Setup
1. Navigate to server
  ```bash
   cd server
  ```
2. Install the dependencies
  ```bash
   npm install
  ```
3. Create a .env file in the server folder and add your MongoDB connection string, Port and JWT secret
  ```txt
    MONGO_URI=
    PORT=
    JWT_SECRETKEY=
  ```
4. Start the backend server
  ```bash
   npm run dev
  ```
### Frontend Setup
1. Navigate to the client folder
  ```bash
   cd client
  ```
2. Install the dependencies
  ```bash
   npm install
  ```
3. Create a .env file in the client folder if necessary, for example to specify the API URL
  ```txt
    REACT_APP_URL="http://localhost:<PORT>/api"
    REACT_APP_ASSETS_URL="http://localhost:<PORT>"
  ```
4. Start the frontend development server
  ```bash
   npm start
  ```

