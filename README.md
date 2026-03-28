# 📚 Bookstore Project API

A simple **Node.js + Express API** for managing bookstore records using MongoDB. This project allows you to add books, fetch all books, search by name, apply pagination, and validate request data before saving.

---

## 📌 Overview

This backend API is built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* express-validator
* Nodemon

The application uses **ES Modules**, connects to a local MongoDB server, defines a `books` collection, and provides REST APIs for managing book data.

---

## ✨ Features

* Express server setup
* JSON body parsing (`express.json()`)
* MongoDB connection using Mongoose
* Book schema and model
* Add book API
* Fetch all books API
* Search books by name
* Pagination (`page`, `limit`)
* Sorting by book name
* Request validation (`express-validator`)
* Schema validation (Mongoose)
* Development with Nodemon
* ES module support

---

## 🛠 Tech Stack

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| Node.js           | Runtime environment     |
| Express.js        | API & routing           |
| MongoDB           | Database                |
| Mongoose          | ODM for MongoDB         |
| express-validator | Input validation        |
| Nodemon           | Auto-restart dev server |

---

## 📁 Project Structure

```text
bookstore-project-api/
│
├── configs/
│   └── database.js
│
├── middlewares/
│   └── validation.js
│
├── models/
│   └── bookModel.js
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

1. `index.js` starts the server on **port 3200**
2. `configs/database.js` connects to MongoDB
3. `express.json()` parses request bodies
4. `bookModel.js` defines schema
5. `validation.js` handles input validation
6. `POST /add` → validates & saves book
7. `GET /` → returns all books
8. `GET /api` → search + pagination + sorting

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB (local or running instance)

---

### Steps to Run

```bash
npm install
```

Start MongoDB at:

```bash
mongodb://localhost:27017/
```

Run the project:

```bash
npm run dev
```

OR

```bash
npm start
```

Open in browser:

```text
http://localhost:3200
```

---

## 📜 Available Scripts

| Command     | Description         |
| ----------- | ------------------- |
| npm start   | Run using Node      |
| npm run dev | Run using Nodemon   |
| npm test    | Not implemented yet |

---

## 🗄 Database Configuration

Located in:

```js
configs/database.js
```

Default connection:

```js
await mongoose.connect('mongodb://localhost:27017/');
```

Recommended:

```js
await mongoose.connect('mongodb://localhost:27017/bookstore');
```

---

## 📚 Data Model

### Book Schema Fields

| Field    | Type   | Required | Rules  |
| -------- | ------ | -------- | ------ |
| bookname | String | Yes      | trim   |
| author   | String | Yes      | trim   |
| price    | Number | Yes      | min: 1 |
| pages    | Number | Yes      | min: 1 |

---

## ✅ Validation

Using **express-validator**

### Rules:

* bookname → required
* author → required
* price → required
* pages → required

### Error Messages:

* Please Enter Book Name
* Please Enter Author Name
* Please Enter Price
* Please Enter Pages

---

## 🔌 API Endpoints

---

### 1️⃣ Get All Books

```http
GET /
```

Returns all books.

---

### 2️⃣ Search + Pagination + Sorting

```http
GET /api
```

#### Query Params

| Param  | Default | Description        |
| ------ | ------- | ------------------ |
| search | ''      | Search by bookname |
| page   | 1       | Page number        |
| limit  | 5       | Records per page   |

#### Example

```http
GET /api?search=harry&page=1&limit=5
```

---

### 3️⃣ Add Book

```http
POST /add
```

#### Request Body

```json
{
  "bookname": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "price": 350,
  "pages": 220
}
```

---

### ✅ Success Response

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

---

### ❌ Validation Error

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

---

## 🧪 Testing (Postman)

* Method: POST
* URL: `http://localhost:3200/add`
* Body: raw JSON

---

## 📊 Current Behavior

* Fetch all books
* Search books
* Pagination enabled
* Sorting by bookname
* Validation applied

---

## ⚠️ Limitations

* No update API
* No delete API
* No single book API
* No `.env` support
* Hardcoded DB URI
* No global error handler

---

## 🚀 Future Improvements

* Add PUT (update) API
* Add DELETE API
* Add GET by ID
* Use `.env` for config
* Add proper status codes
* Improve validation
* Add error handling middleware
* Add total count in pagination

---

## 📄 .gitignore

```text
node_modules/
```

---

## 👨‍💻 Author

**Sagar Gadige**

---

⭐ If you like this project, consider giving it a star on GitHub!
