# API Documentation
This document provides an overview of the API endpoints for the Basic Blog Platform.

## User Endpoints

## Register a new user

Endpoint: POST /users/register

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```

**Response (Success):**

```
{
    "status": "ok",
    "user": {
        "id": 3,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "updatedAt": "2024-01-26T20:43:13.362Z",
        "createdAt": "2024-01-26T20:43:13.362Z"
    }
}
```

**Response (Error):**

```
{
  "status": "error",
     "message": "Unprocessable Entity",
     "errors": {
         "email": "Already registered",
         "password": "\"password\" is not allowed to be empty"
     }
}
```

## User Login

Endpoint: POST /users/login

**Request:**

```
{
  "email": "john.doe@example.com",
  "password": "yourPassword"
}
```

**Response (Success):**

```
{
  "status": "ok",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-26T20:46:02.000Z",
    "updatedAt": "2024-01-26T20:46:02.000Z"
  },
  "token": "your_jwt_token_here"
}
```

**Response (Error):**

```
{
  "status": "error",
   "message": "Invalid email or password",
}
```


## Update User Information  
- Only Authenticated users

Endpoint: PUT /users/update

**Request:** 

```
{
  "firstName": "UpdatedFirstName",
  "lastName": "UpdatedLastName",
  "email": "john.doe@example.com",
  "password": "newsecurepassword"
}
```

**Response (Success):**

```
{
  "status": "ok",
  "user": {
    "id": 1,
    "firstName": "UpdatedFirstName",
    "lastName": "UpdatedLastName",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-26T20:43:13.000Z",
    "updatedAt": "2024-01-26T20:59:00.372Z"
  }
}
```

**Response (Error):**

```
"status": "error",
"message": "jwt must be provided",
```

## Delete User Account
- Only Authenticated users

Endpoint: DELETE /users/delete/:id  Authenticated users

**Response (Success):**

```
{
  "status": "ok"
}
```
**Response (Error):**

(Error responses will contain appropriate error messages if deletion fails.)


## Get User Profile

Endpoint: GET /users/single/:id

**Response (Success):**

```
{
  "status": "ok",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-26T20:46:02.000Z",
    "updatedAt": "2024-01-26T20:46:02.000Z"
  }
}
```

**Response (Error):**

```
{
  "status": "error",
  "message": "User not found"
}
```

## Blog Endpoints

## Create a new blog post
- Only Authenticated users

Endpoint: POST /blogs

**Request:**

```
{
  "title": "Sample Blog Post",
  "body": "This is the content of the blog post."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "blog": {
    "id": 1,
    "authorId": 3,
    "title": "Sample Blog Post",
    "body": "This is the content of the blog post.",
    "updatedAt": "2024-01-26T22:08:21.130Z",
    "createdAt": "2024-01-26T22:08:21.130Z"
  }
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if creation fails.)


## Update a blog post
- Only Authenticated users

Endpoint: PUT /blogs/update


**Request:**

```
{
  "blogId": 1,
  "title": "Updated Blog Post",
  "body": "This is the updated content of the blog post."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "blog": {
    "id": 1,
    "title": "Updated Blog Post",
    "body": "This is the updated content of the blog post.",
    "createdAt": "2024-01-26T22:08:21.000Z",
    "updatedAt": "2024-01-26T22:13:34.243Z",
    "authorId": 1
  }
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if update fails.)


## Delete a blog post
- Only Authenticated users

Endpoint: DELETE /blogs/:blogId

**Response (Success):**

```
{
  "status": "ok"
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if deletion fails.)

## Get all blog posts

Endpoint: GET /blogs?limit=(number between 1-100)&page=(min-1)

**Response (Success):**

```
{
  "status": "ok",
  "blogs": [
    {
      "id": 1,
      "title": "Sample Blog Post",
      "body": "This is the content of the blog post.",
      "authorId": 1,
      "createdAt": "2024-01-26T22:17:22.000Z",
      "updatedAt": "2024-01-26T22:17:22.000Z",
    },
    {
      "id": 2,
      "title": "Another Blog Post",
      "body": "This is another blog post.",
      "authorId": 1,
      "createdAt": "2024-01-26T22:17:19.000Z",
      "updatedAt": "2024-01-26T22:17:19.000Z",
    }
    // ... more blog posts
  ],
  "total": 2,
  "totalPages": 1
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if retrieval fails.)

## Get a single blog post

Endpoint: GET /blogs/single/:id?limit=(number between 1-100)&page=(min-1)

**Response (Success):**

```
{
  "status": "ok",
  "blog": {
    "id": 1,
    "title": "Sample Blog Post",
    "body": "This is the content of the blog post.",
    "authorId": 1,
    "createdAt": "2024-01-26T22:17:19.000Z",
    "updatedAt": "2024-01-26T22:17:19.000Z",
    "comments": [
            {
                "id": 1,
                "text": "This is a comment on the blog post.",
                "createdAt": "2024-01-26T22:32:26.000Z",
                "updatedAt": "2024-01-26T22:32:26.000Z",
                "authorId": 3,
                "blogId": 5
            },
            {
                "id": 2,
                "text": "This is a another comment on the blog post.",
                "createdAt": "2024-01-26T22:32:39.000Z",
                "updatedAt": "2024-01-26T22:32:39.000Z",
                "authorId": 6,
                "blogId": 5
            }
        ]
  },
   "totalComments": 2,
   "totalCommentsPages": 1
}
```

**Response (Error):**

```
{
  "status": "error",
  "message": "Blog not found"
}
```

## Comment Endpoints

## Create a new comment
- Only Authenticated users

Endpoint: POST /comments

**Request:**

```
{
  "blogId": 1,
  "text": "This is a comment on the blog post."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "comment": {
    "id": 1,
    "authorId": 3,
    "blogId": 1,
    "text": "This is a comment on the blog post.",
    "updatedAt": "2024-01-26T22:32:39.781Z",
    "createdAt": "2024-01-26T22:32:39.781Z"
  }
}
```
**Response (Error):**

(Error responses will contain appropriate error messages if creation fails.)

## Update a comment
- Only Authenticated users

Endpoint: PUT /comments/update

**Request:**

```
{
  "id": 1,
  "text": "This is the updated comment."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "comment": {
    "id": 1,
    "text": "This is the updated comment.",
    "authorId": 1,
    "blogId": 1,
    "createdAt": "2024-01-26T22:32:26.000Z",
    "updatedAt": "2024-01-26T22:38:06.870Z",
  }
}
```
**Response (Error):**

(Error responses will contain appropriate error messages if update fails.)

## Delete a comment
- Only Authenticated users

Endpoint: DELETE /comments/:id

**Response (Success):**

```
{
  "status": "ok"
}
```
**Response (Error):**
(Error responses will contain appropriate error messages if deletion fails.)
