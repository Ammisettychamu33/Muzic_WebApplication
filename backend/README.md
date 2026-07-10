# 🎵 Music Vibes Backend

Backend API for the **Music Vibes** MERN Stack Application.

---

## 📌 Features

- User Registration
- User Login (JWT Authentication)
- Contact Form API
- Album CRUD Operations
- MongoDB Database
- Password Encryption using bcrypt
- Environment Variable Support

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 📂 Project Structure

```
backend
│
├── node_modules
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## ⚙ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a **.env** file in the backend folder.

```env
MONGO_URI=mongodb://127.0.0.1:27017/music-vibes
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Running the Server

```bash
node server.js
```

or if using nodemon

```bash
npx nodemon server.js
```

Server starts on

```
http://localhost:5000
```

---

# API Endpoints

## Register User

POST

```
/register
```

Body

```json
{
    "username":"John",
    "email":"john@gmail.com",
    "password":"123456"
}
```

---

## Login

POST

```
/login
```

Body

```json
{
    "email":"john@gmail.com",
    "password":"123456"
}
```

Returns

```json
{
    "token":"JWT_TOKEN",
    "user":{
        "id":"...",
        "username":"John",
        "email":"john@gmail.com"
    }
}
```

---

## Contact Form

POST

```
/contact
```

Body

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "message":"Hello"
}
```

---

## Get Albums

GET

```
/albums
```

---

## Add Album

POST

```
/albums
```

Body

```json
{
    "title":"Album Name",
    "artist":"Artist Name",
    "year":2024
}
```

---

## Update Album

PUT

```
/albums/:id
```

---

## Delete Album

DELETE

```
/albums/:id
```

---

## Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- body-parser

---

## Developed By

**Chamundeswari Ammisetty**

MERN Stack Developer

2026