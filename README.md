# Task Manager Application with Express, Mongoose, and JSON Web Token Authentication

# Description:

Welcome to our Task Manager application, a feature-rich platform built using Express, Mongoose, and JSON Web Token (JWT) for secure authentication. This application empowers users to efficiently manage their tasks, providing a seamless experience for task creation, editing, reading, and deletion. Additionally, users can manage their profiles, allowing them to access, edit, and delete their personal information.

## API Documentation

For detailed API documentation, including endpoints, request examples, and response formats, please refer to the [Postman Documentation](https://documenter.getpostman.com/view/31765247/2sA2rAyh4t).

## Getting Started

### Prerequisites

- Node.js (version 18.16.0)
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ibadetegashi/Task-App.git

#### Install dependencies:
    cd Task-App
    npm install

2. Create a .env file in the root folder and add your secret key:

- SECRET_KEY=YOUR_SECRET_KEY

3. Start the application:

For production-like environment:
- <code>npm start</code>

For development environment (using nodemon for automatic restarts):
- <code>npm run dev</code>

The application will be accessible at http://localhost:3000.

# Key Features:

## User Registration:

New users can easily register and create an account on the platform, providing a secure foundation for task management.
Task Management:

Users have the ability to perform CRUD operations (Create, Read, Update, Delete) on their tasks, enabling them to keep track of their responsibilities effectively.

## Profile Management:

Users can access their profile information, edit details such as fullname or email, and delete their profile if needed, giving them control over their personal data.

## Authentication with JSON Web Tokens:

The application ensures secure authentication using JSON Web Tokens, safeguarding user data and providing a seamless login experience.

## Task Filtering:

Users can filter their tasks based on completion status, allowing them to view either completed or outstanding tasks with ease.

## Pagination and Sorting:

To enhance user experience, tasks are paginated for easy navigation, and users can sort tasks based on various criteria to prioritize their workflow.

## Efficient Authorization:

JSON Web Tokens are employed for authentication, ensuring that users have appropriate access to their tasks and profile data.




