# MoviesFlix-Hub

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Requirements](#requirements)
5. [Installation](#installation)
6. [Running the Application](#running-the-application)
7. [API Integration](#api-integration)
8. [Contributing](#contributing)

## Overview

MoviesFlix-Hub is a React-based client-side application for movie enthusiasts. It allows users to browse, search, and manage their favorite movies, as well as update their profile information.

## Features

- User registration and login functionality
- Browse and search for movies
- View detailed information about individual movies
- Add and remove movies from a user's list of favorites
- Update user profile information
- Responsive design for various screen sizes
- React-based single-page application
- Integration with a RESTful API backend
- Form validation for user inputs
- Movie filtering by genre
- User authentication and authorization
- Secure storage of user credentials
- Visually appealing UI with Bootstrap and custom styling

## Technologies Used

### Frontend
- React
- React Bootstrap
- Redux

### Backend
- Express.js
- Node.js

### Database
- MongoDB

### Authentication
- Passport.js

### Build Tools
- Parcel

### Version Control
- Git

## Requirements

Before you begin, ensure you have met the following requirements:
* Node.js (version 14 or later)
* npm (comes with Node.js)
* Git

## Installation

To install MoviesFlix-Hub, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies by running npm install

## Running the Application

After installation, start the development server: npm start
The application should now be running on `http://localhost:1234` (or the port specified in your configuration).

## API Integration

This frontend application interacts with a backend API. Below are the key endpoints used:

- `POST /login`: Authenticates a user and retrieves a JWT token
- `GET /movies`: Retrieves all movies (requires authentication)
- `GET /movies/:title`: Retrieves a specific movie by title
- `GET /genres/:name`: Retrieves genre information
- `GET /directors/:name`: Retrieves director information
- `POST /users`: Registers a new user
- `PUT /users/:username/update-username`: Updates a user's username
- `DELETE /users/:username`: Deletes a user account
- `POST /users/:username/favorites/:movieId`: Adds a movie to user's favorites
- `DELETE /users/:username/favorites/:movieId`: Removes a movie from user's favorites
- `GET /movie-of-the-day`: Retrieves a random "movie of the day"

Note: Most endpoints require JWT authentication. Ensure you include the JWT token in the Authorization header for authenticated requests.

For more detailed information about these endpoints, please refer to the backend API documentation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.





