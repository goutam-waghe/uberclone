# User Registration API

## Endpoint: `/user/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON object containing the authentication token and user details.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

### Example Request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:
The response will be a JSON object with the following fields:

- `token` (string): The authentication token for the registered user.
- `user` (object): The user details.

### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Status Codes:
- `200 OK`: User registered successfully.
- `400 Bad Request`: Validation errors or user already exists.
- `500 Internal Server Error`: An error occurred on the server.

### Validation Errors:
If the input data is invalid, the response will contain an array of validation errors. Example:
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name should be more than 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must have at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

# User Login API

## Endpoint: `/user/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It validates the input data, checks if the user exists, compares the provided password with the stored hashed password, and returns a JSON object containing the authentication token and user details upon successful login.

### Request Body:
The request body should be a JSON object with the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:
The response will be a JSON object with the following fields:

- `Message` (string): A message indicating the login status.
- `token` (string): The authentication token for the logged-in user.
- `user` (object): The user details.

### Example Response:
```json
{
  "Message": "login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Status Codes:
- `200 OK`: User logged in successfully.
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: An error occurred on the server.

### Validation Errors:
If the input data is invalid, the response will contain an array of validation errors. Example:
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must have at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```