# Muzic – Music Streaming Platform

A modern, full-stack MERN music streaming web application designed for exploring music albums, discovering top artists, streaming audio tracks, watching music videos, and managing custom music collections.

---

## 🔗 Live Application

- **Frontend (Live Demo):** `[Live Demo – add Vercel URL]`
- **Backend (API):** `[API – add Render URL]`

---

## 🛠 Tech Stack

### Frontend
- **React.js** (v19)
- **JavaScript (ES6+)**
- **HTML5 & CSS3**
- **React Router DOM** (Client-side SPA Routing)
- **Axios & Fetch API** (HTTP requests)
- **Lucide React & React Icons** (UI icons)

### Backend
- **Node.js**
- **Express.js** (REST API)
- **Mongoose** (MongoDB ODM)
- **JSON Web Tokens (JWT)** (Authentication)
- **bcryptjs** (Password hashing)
- **CORS & Dotenv** (Cross-origin handling & environment configuration)

### Database
- **MongoDB Atlas** (Cloud Database)

---

## ✨ Features

- **User Authentication:** Secure user registration and login with encrypted password storage (`bcryptjs`) and JSON Web Token (`JWT`) authentication.
- **Session Management & Protected Routes:** Persistent authentication using browser `localStorage` protecting access to Albums, Artists, and Collections.
- **Music Albums Discovery:** Browse multilingual albums (Telugu, Hindi, Tamil, and English) with album covers, metadata, audio preview, and embedded video players.
- **Top Artists Showcase:** Discover featured artists with biographies, genres, individual audio tracks with speed adjustment (`0.5x`, `1x`, `1.5x`, `2x`), and embedded video spotlights.
- **Integrated Music Search:** Real-time search by album name, artist, or genre with external discovery fallback.
- **Music Collection Management (CRUD):** Full Create, Read, Update, and Delete operations for albums with MongoDB persistence and interactive modal interfaces.
- **Contact Inquiries:** Contact form connecting directly to backend API and saving submissions in MongoDB.
- **Services & About Pages:** Comprehensive information about the platform, services, and music highlights.
- **Responsive Design:** Mobile-responsive navigation drawer and desktop interface with smooth transitions.

---

## 📂 Repository Structure

```
Muzic_WebApplication/
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Album.js
│   │   ├── Contact.js
│   │   └── User.js
│   ├── package.json
│   ├── README.md
│   └── server.js
└── frontend/
    ├── .env.example
    ├── package.json
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── About/
    │   ├── Albums/
    │   ├── Artists/
    │   ├── Contact/
    │   ├── Crud/
    │   ├── Footer/
    │   ├── Home/
    │   ├── Login/
    │   ├── Navbar/
    │   ├── Registration/
    │   ├── Services/
    │   ├── config/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── vercel.json
    └── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` (Assigned automatically by Render) |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://<user>:<password>@cluster.mongodb.net/muzic` |
| `JWT_SECRET` | Secret key for JWT token generation & verification | Strong random string |
| `FRONTEND_URL` | Deployed Vercel frontend URL for CORS | `https://your-frontend.vercel.app` |

### Frontend (`frontend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | Base URL of deployed backend API | `https://your-backend.onrender.com` |

---

## 🚀 Deployment Guide

### 1. Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster (free tier M0 supported).
3. Under **Database Access**, create a database user with read/write privileges.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere) to permit cloud backend connections from Render.
5. In **Database** > **Connect** > **Drivers**, copy the standard connection string (`mongodb+srv://...`).

### 2. Backend (Render)
1. Log in to [Render](https://render.com/) and click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Name:** `muzic-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. In **Environment Variables**, add:
   - `MONGODB_URI` = *(Your MongoDB Atlas connection string)*
   - `JWT_SECRET` = *(Your JWT secret string)*
   - `FRONTEND_URL` = *(Your Vercel URL once deployed, or temporary wildcard during initial setup)*
5. Click **Create Web Service**.
6. Once deployed, verify health at `https://<your-render-backend-url>/health`.

### 3. Frontend (Vercel)
1. Log in to [Vercel](https://vercel.com/) and click **Add New...** > **Project**.
2. Import the `Muzic_WebApplication` repository.
3. In project configuration:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Under **Environment Variables**, add:
   - `REACT_APP_API_URL` = `https://<your-render-backend-url>` (Your Render backend URL without trailing slash)
5. Click **Deploy**.
6. Once deployed, copy your Vercel live domain URL and update the `FRONTEND_URL` environment variable in your Render backend dashboard.

---

## 💻 Local Development Setup

### Backend
```bash
cd backend
npm install
# Create .env based on .env.example
npm run dev # or npm start
```

### Frontend
```bash
cd frontend
npm install
# Create .env based on .env.example with REACT_APP_API_URL=http://localhost:5000
npm start
```

---

## 📄 License

This project is open source and available for educational purposes.
