# Quotes backend/API

## 1. Getting started
### 1.1 Requirements
- node version 18.12.1
- npm
- postgres

### 1.2 Project configuration
Start by cloning this project:
```sh
git clone https://github.com/urosmeh/user-quote-backend.git
```

Install dependencies:
```sh
cd ./user-quote-backend
npm install
```

Setup database until .env doesn't exist

### 1.3 Run project
```sh
# Launch the development server
npm run dev
```
Your server now runs on `http://localhost:3000/`.

## 2. Endpoints
- Authentication
  - ```/auth/login [POST]``` - login
  - ```/auth/signup [POST]``` - signup
- Users
  - ```/users/{id} [GET]``` - get user by id
- Quotes
  - ```/quotes [GET]``` - get all quotes
  - ```/quotes/{id} [GET]``` - get quote by id
  - ```/quotes/{id}/upvote [PATCH]``` - upvote quote with id equal to {id}
  - ```/quotes/{id}/downvote [PATCH]``` - downvote quote with id equal to {id}
- Me
  - ```/me [GET]``` - get current user
  - ```/me/my-quote [POST]``` - post a quote
  - ```/me/my-quote [PATCH]``` - update current users quote


## 3. Project goals
- To learn:
  - TypeScript
  - NestJS
- To revise and expand backend technology knowledge.