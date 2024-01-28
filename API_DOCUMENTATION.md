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
        "_id": "65b6c8845a6c80b9f4ccea84",
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
    "_id": "65b6c8845a6c80b9f4ccea84",
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
Headers- Authorization: your token 
{
  "firstName": "UpdatedFirstName",
  "lastName": "UpdatedLastName",
  "email": "john.doe@example.com",
  "password": "newSecurePassword"
}
```

**Response (Success):**

```
{
  "status": "ok",
  "user": {
    "_id": "65b6c8845a6c80b9f4ccea84",
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

Endpoint: DELETE /users/delete/:id  Headers- Authorization: your token

- Description:

Deletes a user account and performs a cascading deletion of all 
associated content, including blogs and comments authored by the 
user. Deleting a user ensures the removal of their blogs and comments 
from the system.

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
    "_id": "65b6c8845a6c80b9f4ccea84",
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

Endpoint: POST /blogs/create  Headers - Authorization: your token
 
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
    "_id": "65b6ca88de590c33a4b1ca4e",
    "author": "65b6c8845a6c80b9f4ccea84",
    "title": "Sample Blog Post",
    "body": "This is the content of the blog post.",
    "comments": [],
    "updatedAt": "2024-01-26T22:08:21.130Z",
    "createdAt": "2024-01-26T22:08:21.130Z"
  }
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if creation fails.)


## Update a blog post
- Only Authenticated users

Endpoint: PUT /blogs/update Headers- Authorization: your token

**Request:**

```
{
  "blogId": "65b6ca88de590c33a4b1ca4e",
  "title": "Updated Blog Post",
  "body": "This is the updated content of the blog post."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "blog": {
    "_id": "65b6ca88de590c33a4b1ca4e",
    "title": "Updated Blog Post",
    "body": "This is the updated content of the blog post.",
    "createdAt": "2024-01-26T22:08:21.000Z",
    "updatedAt": "2024-01-26T22:13:34.243Z",
    "author": "65b6c8845a6c80b9f4ccea84",
    "comments": [],
  }
}
```

**Response (Error):**

(Error responses will contain appropriate error messages if update fails.)


## Delete a blog post
- Only Authenticated users

Endpoint: DELETE /blogs/delete:blogId   Headers- Authorization: your token

-Description:

Deletes a blog post and performs a cascading deletion of all associated comments.
Deleting a blog ensures the removal of all comments associated with that blog.

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
      "_id": "65b6ca88de590c33a4b1ca4e",
      "title": "Sample Blog Post",
      "body": "This is the content of the blog post.",
      "author": "65b6c8845a6c80b9f4ccea84",
      "createdAt": "2024-01-26T22:17:22.000Z",
      "updatedAt": "2024-01-26T22:17:22.000Z",
    },
    {
      "_id": "65b6gh88de590c22a4b1ca5e",
      "title": "Another Blog Post",
      "body": "This is another blog post.",
      "author": "65b6c8845a6c80b9f4ccea84",
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

Endpoint: GET /blogs/single/:blogId?limit=(number between 1-100)&page=(min-1)
- limit and page for comments

**Response (Success):**

```
{
  "status": "ok",
  "blog": {
    "_id": "65b6cc06de590c33a4b1ca59",
    "title": "Sample Blog Post",
    "author": "65b6c8845a6c80b9f4ccea84",
    "authorId": 1,
    "createdAt": "2024-01-26T22:17:19.000Z",
    "updatedAt": "2024-01-26T22:17:19.000Z",
    "comments": [
            {
                "_id": "65b6cc29de590c33a4b1ca5e",
                "text": "This is a comment on the blog post.",
                "createdAt": "2024-01-26T22:32:26.000Z",
                "updatedAt": "2024-01-26T22:32:26.000Z",
                "authorId": "65b6c8845a6c80b9f4ccea84",
                "blogId": "65b6cc06de590c33a4b1ca59",
            },
            {
                "_id": "65b6cc2cde590c33a4b1ca62",
                "text": "This is a another comment on the blog post.",
                "createdAt": "2024-01-26T22:32:39.000Z",
                "updatedAt": "2024-01-26T22:32:39.000Z",
                "authorId": "65b6c8845a6c80b9f4ccea84",
                "blogId": "65b6cc06de590c33a4b1ca59",
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

Endpoint: POST /comments/create  Headers- Authorization: your token

**Request:**

```
{
  "blogId": '65b6cc06de590c33a4b1ca59',
  "text": "This is a comment on the blog post."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "comment": {
    "_id": "65b6cc2ede590c33a4b1ca6a",
    "authorId": "65b6c8845a6c80b9f4ccea84",
    "blogId": "65b6cc06de590c33a4b1ca59",
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

Endpoint: PUT /comments/update  Headers - Authorization: your token

**Request:**

```
{
  "id": "65b6cc2ede590c33a4b1ca6a",
  "text": "This is the updated comment."
}
```

**Response (Success):**

```
{
  "status": "ok",
  "comment": {
    "_id": "65b6cc2ede590c33a4b1ca6a",
    "text": "This is the updated comment.",
    "authorId": "65b6c8845a6c80b9f4ccea84",
    "blogId": "65b6cc06de590c33a4b1ca59",
    "createdAt": "2024-01-26T22:32:26.000Z",
    "updatedAt": "2024-01-26T22:38:06.870Z",
  }
}
```
**Response (Error):**

(Error responses will contain appropriate error messages if update fails.)

## Delete a comment
- Only Authenticated users  

Endpoint: DELETE /comments/delete/:id   Headers- Authorization: your token

**Response (Success):**

```
{
  "status": "ok"
}
```
**Response (Error):**
(Error responses will contain appropriate error messages if deletion fails.)
