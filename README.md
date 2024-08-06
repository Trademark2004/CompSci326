# My Web Application

## Project Setup
To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

2. **Install dependencies:**
```bash
    npm install
```

3. **Start the server:**
    ```bash
    npm run start-backend
```

4. **Start the frontend:**
    ```bash
    npm run start-frontend
```
Project Structure
src/
├── frontend/
│   ├── course.html
│   ├── course.js
│   ├── home.html
│   ├── home.js
│   ├──index.html
│   ├── script.js
│   ├── styles.css
│   └── server.js
├── backend/
│   ├── server.js
│   ├── routes.js
│   └── db.js
└── package.json

API Usage
Authentication
No authentication is required for the current version of the API.

Making Requests
All API requests should be made to http://localhost:3001/api.

Response Format
All responses are in JSON format.

Examples
Login
Endpoint: /api/login
Method: POST
Description: Validates user login credentials.

Request Body:

JSON

{
  "username": "user1",
  "password": "pass1"
}

Response Body:

JSON

{
  "success": true
}

Create Account
Endpoint: /api/create-account
Method: POST
Description: Creates a new user account.

Request Body:

JSON

{
  "newUsername": "newuser",
  "newPassword": "newpass"
}

Response Body:

JSON

{
  "success": true,
  "message": "Account created successfully."
}

Submit Quiz Attempt
Endpoint: /api/courses/:courseId/quizzes/:quizId/attempt
Method: POST
Description: Submits a quiz attempt for a specific course and quiz.

Request Body:

JSON

{
  "attempt": {
    "question1": "answer1",
    "question2": "answer2"
  }
}

JSON

{
  "message": "Quiz attempt submitted successfully",
  "correctAnswers": 2
}

Fetch Quiz Results
Endpoint: /api/courses/:courseId/quizzes/:quizId/results
Method: GET
Description: Fetches the results of a specific quiz.

Response Body:

JSON

[
  {
    "attempt": {
      "question1": "answer1",
      "question2": "answer2"
    },
    "correctAnswers": 2,
    "timestamp": "2024-08-06T17:22:38.000Z"
  }
]

API Documentation
Login
Endpoint: /api/login
HTTP Method: POST
Description: Validates user login credentials.
Parameters: None
Request Body:
JSON

{
  "username": "user1",
  "password": "pass1"
}

Response Body:
JSON

{
  "success": true
}

Create Account
Endpoint: /api/create-account
HTTP Method: POST
Description: Creates a new user account.
Parameters: None
Request Body:
JSON

{
  "newUsername": "newuser",
  "newPassword": "newpass"
}
Response Body:
JSON

{
  "success": true,
  "message": "Account created successfully."
}

Submit Quiz Attempt
Endpoint: /api/courses/:courseId/quizzes/:quizId/attempt
HTTP Method: POST
Description: Submits a quiz attempt for a specific course and quiz.
Parameters:
courseId (string): The ID of the course.
quizId (string): The ID of the quiz.
Request Body:
JSON

{
  "attempt": {
    "question1": "answer1",
    "question2": "answer2"
  }

Response Body:
JSON

{
  "message": "Quiz attempt submitted successfully",
  "correctAnswers": 2
}

Fetch Quiz Results
Endpoint: /api/courses/:courseId/quizzes/:quizId/results
HTTP Method: GET
Description: Fetches the results of a specific quiz.
Parameters:
courseId (string): The ID of the course.
quizId (string): The ID of the quiz.
Response Body:
JSON

[
  {
    "attempt": {
      "question1": "answer1",
      "question2": "answer2"
    },
    "correctAnswers": 2,
    "timestamp": "2024-08-06T17:22:38.000Z"
  }
]