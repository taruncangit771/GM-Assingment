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

## Getting Started

### Prerequisites

- Node.js
- Typescript
- PostgreSQL
- npm

### Installation

1.  Clone the repository:

    ```bash
    git clone <GM-Assingment https://github.com/taruncangit771/GM-Assingment.git>
    ```

2.  Navigate to the project directory:

    ```bash
    cd GM-Assingment
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up environment variables:

        Create a `.env` file in the root directory and add the following environment variables:

        ```plaintext
        JWT_SECRET=hsdfkshdfkk
        NODE_ENV=test
        USER_COUNT=0
        GAME_COUNT=0
        PORT=3000
        DEVLOPMENT_DB_HOST=host
        DEVLOPMENT_DB_USER=user
        DEVLOPMENT_DB_PASSWORD=21241
        DEVLOPMENT_DB=mydb
        TEST_DB_HOST=host
        TEST_DB_USER=
        TEST_DB_PASSWORD=
        TEST_DB=
        PRODUCTION_DB_HOST=
        PRODUCTION_DB_USER=
        PRODUCTION_DB_PASSWORD=
        PRODUCTION_DB=
        ADMIN=
        USER=
    ```

5.  Set up the database:

    Make sure PostgreSQL is running and create a new database and update its redials in .env.

### Running the Server

1. Start the server:
   change NODE_ENV in .env to development

   ```bash
   npm run dev
   ```

2. Access the API:

   The API will be running on `localhost` at the port specified in your `.env` file (default is 3000).

### Testing the API with Postman

1. **Download Postman:**

   If you haven't already, download and install Postman.

2. **Import the Postman collection:**

   - Locate the Postman API folder in your project directory.
   - Import the `Assingment gm.postman_collection.json` file into Postman:
     - Click on `Import` in Postman.
     - Upload the JSON file.
     - The collection should now be available in your Postman sidebar.

3. **Use the API:**

   - Open the imported collection in Postman.
   - Select an endpoint to test (e.g., Register User, Login, Create Game, etc.).
   - Ensure you provide valid request body parameters where required.
   - Click `Send` to execute the request and view the API's response.

4. **Run Test Cases:**
   change NODE_ENV=test into .env and update ADMIN,USER with jwt token of admin and user previlage respectively

```bash
npm test
```

## Features

### User Management

- Register a new user
- Login and generate a JWT token
- Get user profile

### Game Management

- Create a new game (Admin only)
- Get all games
- Get a single game by ID
- Update a game (Admin only)
- Delete a game (Admin only)

### Score Management

- Add a score for a game (Player only)
- Get all scores by user
- Get all scores for a game

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
