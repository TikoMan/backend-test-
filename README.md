# Basic Blog Platform

A simple blog platform with user authentication, blog post CRUD operations, and commenting features. This project is built using Node.js and Sequelize with MySQL.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install dependencies using Yarn:**

    ```bash
    yarn
    ```

3. **Create a `.env` file:**

   Create a `.env` file in the root of your project and add the following configurations:

    ```env
    TZ=UTC

    NODE_HOST=localhost
    NODE_PORT=4000

    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_DATABASE=
    MYSQL_USER=
    MYSQL_PASSWORD=

    JWT_SECRET=
    PASSWORD_SECRET=
    ```

4. **Set up the database:**

    - Make sure you have MySQL installed and running.
    - Configure the connection details in the `.env` file.

5. **Run migrations:**

    ```bash
    yarn migrate
    ```

6. **Start the server:**

    ```bash
    yarn start
    ```

## API Documentation

Detailed API documentation can be found in the [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) file.

## Technologies Used

- Node.js
- Express.js
- Sequelize
- MySQL
- dotenv
- http-errors
- jsonwebtoken
- lodash
- md5
- morgan

## ESLint

This project utilizes ESLint for code linting to ensure code quality and maintainability. ESLint helps identify and fix common errors and coding style issues.


### Authors

- Tigran Manukyan

## License

This project is licensed under the MIT License
