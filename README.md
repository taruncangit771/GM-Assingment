# Game Management Assignment

## Project Description

The Game Management Assignment is a backend application built with Node.js and TypeScript. It provides functionalities for an admin to manage users and games, including creating, updating, and deleting games. Users can register, log in using JWT authentication, view game details, and add scores to games. The application also includes role-based access control and comprehensive logging.

## Installation

To set up the project, follow these steps:

1. Ensure that Node.js and TypeScript are installed on your system.
2. Install the necessary dependencies by running:
   ```bash
   npm install
   ```
3. Set up PostgreSQL on your system and configure the database connection in the project.

## Usage
To run the project in development mode, use the following command:

```bash
npm run dev
npm test 
```
## Features

### Admin Features
- Register new users
- Create, update, and delete games

### User Features
- Log in with JWT authentication
- View user profile
- Get details of a single game
- List all games
- Add scores to games
- View scores related to a game
- View scores related to a user

### Role-based Access Control
Implemented using middlewares

### Logging
Logs errors and activities in a date-wise log file

### Testing
Unit and integration tests are written

## Technologies Used
- TypeScript
- Express
- Node.js
- PostgreSQL
- Knex
- Winston
- Jest
- Supertest
- JSON Web Token

## Contact Information
- **Name:** Tarun Sharma
- **Email:** [tarun.sharma@gmaemano.in](mailto:tarun.sharma@gmaemano.in)