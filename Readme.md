# Book CRUD Application

This is a Book CRUD (Create, Read, Update, Delete) backend built with Node.js and uses ory oathkeeper as Access-Proxy. It uses Docker Compose for easy setup.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/elliot14A/books-crud
   ```

2. Navigate to the project folder:

   ```bash
   cd books-crud
   ```

3. Start the application:

   ```bash
   docker compose -f docker-compose.yml up
   ```

## Accessing the Application

### Development

- `/api/health` route: [http://127.0.0.1:4455/.brewapps/books-crud/server/api/health](http://127.0.0.1:4455/.brewapps/books-crud/server/api/health)

## Note

- For production, it's recommended to use an Access Proxies like Ory Oathkeeper to secure the backend and avoid direct exposure.

# Ory Oathkeeper Working - Simple Explanation

Ory Oathkeeper is used to secure and manage access to your API, defining routes as either "protected" or "public." The configuration is designed to enforce authentication for protected routes, which require valid access tokens. If the access tokens are missing or invalid, the request is treated as unauthorized. Here's how it works with a simple example:

## Example: Protected and Public Routes

### Protected Route

A protected route is accessed when a user is authenticated and has valid access tokens. The process involves:

1. **Authentication Check**: When a request is made to a protected route, the configured authenticator, in this case, `cookie_session`, first checks if the `accessToken` and `refreshToken` cookies are passed in the request. If they are not passed, the request is considered unauthorized.

2. **Token Validation**: If the tokens are passed, the authenticator initiates a request to `http://server:8080/api/sessions/whoami` within the Docker intranetwork. This service validates the tokens and returns the user's ID.

3. **Header Addition**: The `X-User` header is added to the actual request to the protected route, containing the user's ID. Additionally, an optional `X-Access-Token` header may be included if an access token refresh is performed. This is performed by the mutator, in this, case `header` mutator.

### Public Route

A public route, in contrast, is accessible without authentication. It is open to anonymous access, and requests do not require access tokens. In your configuration, the `anonymous` authenticator is used for these routes, allowing any user to access them without authentication.

In summary, the Ory Oathkeeper configuration distinguishes between routes that require authentication (protected) and routes that do not (public). For protected routes, it checks for valid access tokens and validates them through a separate service, while public routes remain open for anonymous access. This configuration helps ensure that your API is secure and accessible only to authorized users when needed.

## Routes Available

- POST `/api/auth/(register|login|logout)` to register/login/logout a user
- GET `/api/sessions/whoami` returns the userId when valid cookies are passed(used by oathkeeper)
- CRUD `/api/books/*` to perform crud operations on books entities

**Note: To make a request to the server use the url `http://127.0.0.1:4455/.brewapps/books-crud/server/`**
