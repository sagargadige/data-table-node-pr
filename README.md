# Bookstore Project API

A simple Node.js and Express API for managing bookstore records with MongoDB. This project lets you add books, fetch all books, search by book name, paginate results, and validate incoming request data before saving to the database.

## Overview

This project is a backend API built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- Nodemon

The application uses ES modules, connects to a local MongoDB server, defines a `books` collection through Mongoose, and exposes a small set of API routes for reading and creating book data.

## Features Used In This Project

- Express server setup
- JSON body parsing with `express.json()`
- MongoDB connection using Mongoose
- Book schema and model using Mongoose
- Create book API
- Get all books API
- Search API using query parameters
- Pagination using `page` and `limit`
- Sorting results by book name
- Input validation using `express-validator`
- Schema-level validation using Mongoose
- Development server with `nodemon`
- ES module syntax with `"type": "module"`

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express | API server and routing |
| MongoDB | Database |
| Mongoose | MongoDB ODM and schema modeling |
| express-validator | Request validation |
| Nodemon | Auto-restart during development |

## Project Structure

```text
bookstore project-api/
|-- configs/
|   |-- database.js
|-- middlewares/
|   |-- validation.js
|-- models/
|   |-- bookModel.js
|-- index.js
|-- package.json
|-- package-lock.json
|-- .gitignore
`-- README.md
```

## How The Project Works

1. `index.js` starts the Express server on port `3200`.
2. `configs/database.js` connects the app to local MongoDB.
3. `express.json()` allows the server to read JSON request bodies.
4. `models/bookModel.js` defines the book schema and creates the `books` model.
5. `middlewares/validation.js` contains validation rules for incoming book data.
6. `POST /add` runs validation and saves valid books into MongoDB.
7. `GET /` returns all books from the collection.
8. `GET /api` supports searching, pagination, and sorting.

## Installation And Setup

### Prerequisites

Make sure these are installed on your system:

- Node.js
- npm
- MongoDB Community Server or any running local MongoDB instance

### Steps To Run The Project

1. Open the project folder in terminal.
2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running on:

```text
mongodb://localhost:27017/
```

4. Start the development server:

```bash
npm run dev
```

5. Or start the project normally:

```bash
npm start
```

6. Open:

```text
http://localhost:3200
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the project with Node.js |
| `npm run dev` | Runs the project with Nodemon |
| `npm test` | Placeholder script, not implemented yet |

## Database Configuration

The MongoDB connection is defined in `configs/database.js`.

Current connection string:

```js
await mongoose.connect('mongodb://localhost:27017/');
```

This means the project currently expects a local MongoDB server. If you want to use a specific database name, you can update the connection string to something like:

```js
await mongoose.connect('mongodb://localhost:27017/bookstore');
```

## Data Model

The book schema is defined in `models/bookModel.js`.

### Book Fields

| Field | Type | Required | Extra Rules |
| --- | --- | --- | --- |
| `bookname` | String | Yes | `trim: true` |
| `author` | String | Yes | `trim: true` |
| `price` | Number | Yes | `min: 1` |
| `pages` | Number | Yes | `min: 1` |

### Schema Definition Summary

- `bookname` must be a string and cannot be missing.
- `author` must be a string and cannot be missing.
- `price` must be a number and must be at least `1`.
- `pages` must be a number and must be at least `1`.

## Validation Used

This project uses `express-validator` in `middlewares/validation.js` for request-level validation.

### Request Validation Rules

- `bookname` cannot be empty
- `author` cannot be empty
- `price` cannot be empty
- `pages` cannot be empty

Validation messages used in the project:

- `Please Enter Book Name`
- `Please Enter Author Name`
- `Please Enter Price`
- `Please Enter pages`

### Validation Flow

- Validation rules are attached to the `POST /add` route through the `validation` middleware.
- Inside `index.js`, `validationResult(req)` is used to collect validation errors.
- If errors exist, the API returns `errors: errors.array()`.
- If there are no errors, the book is created in MongoDB.

### Important Note

The request validator checks whether fields are empty. Numeric rules such as minimum value are enforced by the Mongoose schema when the document is saved.

## API Endpoints

### 1. Get All Books

**Route**

```http
GET /
```

**Description**

Returns all books from the MongoDB collection.

**Example Response**

```json
[
  {
    "_id": "67e5abcd1234567890abcd12",
    "bookname": "Atomic Habits",
    "author": "James Clear",
    "price": 499,
    "pages": 320,
    "__v": 0
  }
]
```

## 2. Search, Pagination, And Sorting API

**Route**

```http
GET /api
```

**Query Parameters**

| Parameter | Default | Description |
| --- | --- | --- |
| `search` | `''` | Searches `bookname` using regex |
| `page` | `1` | Current page number |
| `limit` | `5` | Number of records per page |

**How It Works**

- Searches only by `bookname`
- Uses case-insensitive regex with `$options: 'i'`
- Uses `skip = (page - 1) * limit`
- Uses `.limit(limit)` for pagination
- Uses `.sort({ bookname: 1 })` for ascending alphabetical order

**Example Request**

```http
GET /api?search=harry&page=1&limit=5
```

**Example Response**

```json
[
  {
    "_id": "67e5abcd1234567890abcd34",
    "bookname": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling",
    "price": 699,
    "pages": 350,
    "__v": 0
  }
]
```

## 3. Add A New Book

**Route**

```http
POST /add
```

**Description**

Adds a new book after validation.

**Request Body**

```json
{
  "bookname": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "price": 350,
  "pages": 220
}
```

### Success Response

```json
{
  "message": "data added :)",
  "info": {
    "_id": "67e5abcd1234567890abcd56",
    "bookname": "Rich Dad Poor Dad",
    "author": "Robert Kiyosaki",
    "price": 350,
    "pages": 220,
    "__v": 0
  }
}
```

### Validation Error Response

When validation fails, the route returns `errors: errors.array()`. A simplified example is shown below:

```json
{
  "errors": [
    {
      "msg": "Please Enter Book Name",
      "path": "bookname",
      "location": "body"
    }
  ]
}
```

Depending on the request body, multiple error objects may be returned in the `errors` array. The real response may also include extra fields from `express-validator`, such as `value` or `type`.

## Example API Testing

### Using Postman

- Method: `POST`
- URL: `http://localhost:3200/add`
- Body type: `raw`
- Format: `JSON`

### Example Invalid Request

```json
{
  "bookname": "",
  "author": "",
  "price": "",
  "pages": ""
}
```

### Expected Validation Result

You should receive validation error objects for all empty fields.

## Current Behavior Summary

- `GET /` returns all books
- `GET /api` returns filtered and paginated books
- `POST /add` validates request body and creates a book
- Book search is based only on `bookname`
- Sorting is ascending by `bookname`
- Validation errors are returned from `validationResult(req)`

## Current Limitations

- No update API yet
- No delete API yet
- No single book detail API by ID
- No environment variable support yet
- Database URI is hardcoded
- No custom global error-handling middleware
- `npm test` is not implemented

## Possible Future Improvements

- Add `PUT` route for updating books
- Add `DELETE` route for removing books
- Add `GET /book/:id` route
- Move MongoDB URI to `.env`
- Add status codes for success and validation errors
- Add better numeric validation for `price` and `pages`
- Add try/catch blocks around async routes
- Add total count in pagination response

## .gitignore

This project currently ignores:

```text
node_modules/
```

## Author Notes

This is a clean beginner-friendly backend project that demonstrates several important backend concepts in one place:

- Express routing
- Middleware usage
- Validation
- MongoDB integration
- Schema design
- Search
- Pagination
- Sorting

It is a good foundation for expanding into a complete CRUD API.
#   d a t a - t a b l e - p r - n o d e  
 #   d a t a - t a b l e - p r - n o d e  
 #   d a t a - t a b l e - p r - n o d e  
 #   d a t a - t a b l e - p r - n o d e  
 