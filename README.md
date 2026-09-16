# Muzic WebApplication

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) music streaming and collection management web application. Muzic allows users to explore multilingual music albums, discover top artists, stream audio tracks, watch music videos, manage custom album collections via CRUD operations, and access protected features through secure JWT authentication.

---

## 🌐 Live Application & Links

- **Live Demo (Frontend):** [https://muzic-web-application.vercel.app/](https://muzic-web-application.vercel.app/)
- **Live API (Backend):** [https://muzic-webapplication.onrender.com](https://muzic-webapplication.onrender.com/)
- **Health Check:** [https://muzic-webapplication.onrender.com/health](https://muzic-webapplication.onrender.com/health)
- **GitHub Repository:** [https://github.com/Ammisettychamu33/Muzic_WebApplication](https://github.com/Ammisettychamu33/Muzic_WebApplication)

---

## 🛠 Tech Stack

### Frontend
- **React.js** (v19) — Component-based UI library
- **React Router DOM** (v7) — Client-side declarative routing and protected route guards
- **Axios & Fetch API** — Asynchronous HTTP requests and backend integration
- **Lucide React & React Icons** — Modern vector icons
- **Vanilla CSS3** — Custom responsive design and smooth animations

### Backend
- **Node.js** (v20 LTS) — Server-side JavaScript runtime
- **Express.js** (v4) — RESTful API framework
- **Mongoose** (v8) — Object Data Modeling (ODM) for MongoDB
- **JSON Web Tokens (JWT)** — Stateless user session authentication
- **bcryptjs** — Salted password hashing and verification
- **CORS & Dotenv** — Cross-Origin Resource Sharing and environment variable configuration

### Database & Deployment
- **Database:** MongoDB Atlas (Cloud Document Database)
- **Frontend Hosting:** Vercel (Edge-network static & SPA hosting)
- **Backend Hosting:** Render (Cloud Web Service)

---

## ✨ Features

- **Secure User Authentication:** User registration and login powered by `bcryptjs` password encryption and signed `JWT` tokens.
- **Protected Routing & Session Persistence:** Client-side route protection using `localStorage` to guard authenticated sections (Albums, Artists, and Music Collections).
- **Multilingual Album Discovery:** Browse curated collections across Telugu, Hindi, Tamil, and English music with metadata, integrated audio player, and embedded YouTube videos.
- **Top Artists Showcase:** Artist profiles featuring bios, genres, individual track streaming with customizable playback speeds (`0.5x`, `1x`, `1.5x`, `2x`), and video spotlights.
- **Live Music Search:** Real-time search by album title, artist, or genre with external search fallback.
- **Music Collection Management (CRUD):** Full Create, Read, Update, and Delete capabilities for custom music albums persisted in MongoDB Atlas with interactive modal dialogs.
- **Contact Inquiries:** Functional contact form storing user messages and feedback directly into the database.
- **Responsive Navigation:** Interactive navigation drawer for mobile screens and persistent sidebar for desktop layouts.

---

## 🏗 Architecture

```
┌───────────────────────────────────────────────────────────┐
│                      Client Tier                          │
│               React 19 SPA (Hosted on Vercel)             │
│  - React Router DOM (Protected Routes & SPA Rewrites)     │
│  - Centralized API Client (REACT_APP_API_URL)             │
└─────────────────────────────┬─────────────────────────────┘
                              │ HTTPS / REST API
┌─────────────────────────────▼─────────────────────────────┐
│                      Server Tier                          │
│             Express.js REST API (Hosted on Render)        │
│  - JWT Authentication & bcryptjs Password Hashing         │
│  - CORS Middleware & Centralized Error Handling           │
│  - Health Check Endpoint (/health)                        │
└─────────────────────────────┬─────────────────────────────┘
                              │ Mongoose ODM
┌─────────────────────────────▼─────────────────────────────┐
│                     Database Tier                         │
│                    MongoDB Atlas                          │
│  - Collections: Users, Albums, Contacts                   │
└───────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
Muzic_WebApplication/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB Atlas connection setup
│   ├── models/
│   │   ├── Album.js           # Mongoose Album schema
│   │   ├── Contact.js         # Mongoose Contact schema
│   │   └── User.js            # Mongoose User schema
│   ├── .env.example           # Backend environment template
│   ├── .node-version          # Pinned Node 20 LTS version
│   ├── .nvmrc                 # NVM configuration
│   ├── package.json           # Backend scripts & dependencies
│   ├── README.md              # Backend documentation
│   └── server.js              # Express app entry & API routes
│
├── frontend/
│   ├── public/
│   │   ├── index.html         # HTML root template
│   │   └── manifest.json      # Web app manifest
│   ├── src/
│   │   ├── About/             # About page component
│   │   ├── Albums/            # Multilingual albums & audio player
│   │   ├── Artists/           # Artist spotlights & playback speed controls
│   │   ├── Contact/           # Contact form component
│   │   ├── Crud/              # Music collection CRUD management
│   │   ├── Footer/            # Footer component
│   │   ├── Home/              # Landing & hero section
│   │   ├── Login/             # User login modal & form
│   │   ├── Navbar/            # Navigation bar & mobile drawer
│   │   ├── Registration/      # User registration form
│   │   ├── Services/          # Platform services overview
│   │   ├── config/
│   │   │   └── api.js         # Centralized API base URL config
│   │   ├── App.js             # Root component & route definitions
│   │   ├── App.css            # Global styling rules
│   │   ├── index.js           # React DOM root entry
│   │   └── index.css          # Baseline CSS styles
│   ├── .env.example           # Frontend environment template
│   ├── package.json           # Frontend scripts & dependencies
│   ├── vercel.json            # Vercel SPA routing rewrites
│   └── README.md              # Frontend documentation
│
├── .gitignore                 # Root gitignore rules
└── README.md                  # Project documentation
```

---

## 🔌 API Endpoints

### System
- `GET /health` — Health check endpoint returning `{ "status": "ok" }`
- `GET /` — Root status message

### Authentication
- `POST /register` — Register a new user (`username`, `email`, `password`)
- `POST /login` — Authenticate user and receive JWT token (`email`, `password`)

### Music Albums (CRUD)
- `GET /albums` — Retrieve all albums from database
- `POST /albums` — Create a new album (`title`, `artist`, `year`)
- `PUT /albums/:id` — Update an existing album by ID
- `DELETE /albums/:id` — Delete an album by ID

### Inquiries
- `POST /contact` — Submit a contact inquiry (`name`, `email`, `message`)

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
| :--- | :--- |
| `PORT` | Listening port for Express (assigned automatically by Render, default `5000`) |
| `MONGODB_URI` | MongoDB Atlas cluster connection string |
| `JWT_SECRET` | Secret key for signing and verifying JWT authentication tokens |
| `FRONTEND_URL` | Deployed frontend URL for CORS authorization (e.g., `https://muzic-web-application.vercel.app`) |

### Frontend (`frontend/.env`)

| Variable | Description |
| :--- | :--- |
| `REACT_APP_API_URL` | Base URL of deployed backend API (e.g., `https://muzic-webapplication.onrender.com`) |

---

## 💻 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or v20 LTS recommended)
- [npm](https://www.npmjs.com/) (v9+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/Ammisettychamu33/Muzic_WebApplication.git
cd Muzic_WebApplication
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```
Start the backend development server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
REACT_APP_API_URL=http://localhost:5000
```
Start the React application:
```bash
npm start
```
The application will open automatically at [http://localhost:3000](http://localhost:3000).

---

## 🚀 Production Deployment Overview

### Frontend (Vercel)
- **Framework Preset:** `Create React App`
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Environment Variable:** `REACT_APP_API_URL = https://muzic-webapplication.onrender.com`
- **SPA Routing:** Managed automatically via `frontend/vercel.json` rewrites.

### Backend (Render)
- **Service Type:** Web Service
- **Root Directory:** `backend`
- **Runtime:** `Node` (v20 LTS via `package.json` engines & `.node-version`)
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL = https://muzic-web-application.vercel.app`

### Database (MongoDB Atlas)
- **Network Access:** Configured to allow cloud web service access (`0.0.0.0/0`).
- **Database Access:** Dedicated user with read/write privileges.

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
