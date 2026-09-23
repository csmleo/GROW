# GROW – Online Student Notes Marketplace

> A full-stack web platform that enables students to upload, discover, and access academic notes in one centralized marketplace.

## 📌 Overview

**GROW** is a full-stack web application designed to make academic note sharing easier and more organized for students.

Students can create an account, upload their study notes as PDF files, browse notes uploaded by other users, manage their uploads, and maintain their profile.

The platform combines a modern React frontend with a Node.js/Express backend, MongoDB for data management, and Cloudinary for PDF storage.

---

## ✨ Features

### 👤 Authentication
- User registration and login
- JWT-based authentication
- Protected user-specific operations
- Persistent authentication state
- Secure account deletion

### 📚 Notes Marketplace
- Browse available academic notes
- View note details
- Filter and sort notes
- Free and paid note support
- Open PDF notes
- Real database-driven note listings

### 📤 Note Upload
- Upload academic notes as PDF files
- Add title, subject, and description
- Store uploaded PDFs using Cloudinary
- Save note metadata in MongoDB
- View uploaded notes from the Dashboard

### 👤 Profile Management
- View user profile
- Edit name and email
- Update profile information
- Real-time profile state updates
- Delete account with confirmation

### 📊 Dashboard
- View uploaded notes
- Track personal uploads
- View account information
- Manage profile-related settings

### 🎨 User Interface
- Modern responsive design
- Glassmorphism-inspired interface
- Responsive note cards
- Clean navigation
- User-friendly forms and modals

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- Express Validator

### Database
- MongoDB
- Mongoose

### File Storage
- Cloudinary

### Deployment
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      Student        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       (Vite)         │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Backend        │
                    └──────┬────────┬─────┘
                           │        │
                  ┌────────▼───┐  ┌─▼──────────┐
                  │  MongoDB   │  │ Cloudinary │
                  │  Database  │  │ PDF Storage│
                  └────────────┘  └────────────┘
````

---

## 🔐 Authentication Flow

```text
Register / Login
       ↓
   JWT Token
       ↓
Authenticated Request
       ↓
Express Middleware
       ↓
Verify JWT
       ↓
Access Protected Resource
```

Protected operations include:

* Uploading notes
* Viewing personal uploads
* Updating profile
* Deleting account

---

## 📂 Project Structure

```text
GROW/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── services/
│
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas account
* Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/csmleo/GROW.git
cd GROW
```

### 2. Install Dependencies

Install root dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file for the backend.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Important:** Never commit `.env` files, passwords, API keys, or other secrets to GitHub.

### 4. Run the Backend

```bash
cd backend
npm start
```

### 5. Run the Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The application will then be available through the local Vite development server.

---

## 🔌 Main API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login user             |
| GET    | `/api/auth/me`       | Get current user       |
| DELETE | `/api/auth/account`  | Delete current account |

### Notes

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/notes/upload` | Upload a note              |
| GET    | `/api/notes`        | Get available notes        |
| GET    | `/api/notes/:id`    | Get note details           |
| GET    | `/api/notes/my`     | Get current user's uploads |

### Profile

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| PUT    | `/api/users/profile` | Update current profile |

---

## 🔒 Security

GROW uses several security practices:

* JWT-based authentication
* Protected API routes
* User-specific authorization
* Password protection
* Request validation
* Duplicate email validation
* Environment variables for secrets
* User-scoped account deletion
* No user ID supplied by the client for account deletion

---

## ☁️ Deployment

The application is designed using a separate frontend/backend deployment architecture.

```text
React + Vite
     │
     ▼
  Vercel
     │
     │ REST API
     ▼
Node.js + Express
     │
     ├──────────► MongoDB Atlas
     │
     └──────────► Cloudinary
     
     Backend deployed on Render
```

---

## 🎯 Project Goals

The main goals of GROW are to:

* Make academic notes easier to discover
* Provide a centralized platform for student resources
* Allow students to share their own notes
* Provide organized access to PDF study materials
* Create a foundation for a student-focused notes marketplace

---

## 🔮 Future Enhancements

Potential future improvements include:

* ⭐ Note ratings and reviews
* 🔖 Saved/bookmarked notes
* 📥 Download tracking
* 🛡️ Note reporting system
* 👨‍💼 Admin dashboard
* 💳 Online payment integration
* ✏️ Note editing and deletion
* 🔍 Advanced search and filtering
* 📱 Improved mobile experience

---

## 👨‍💻 Project

**Project Name:** GROW – Online Student Notes Marketplace

**Repository:**
[https://github.com/csmleo/GROW](https://github.com/csmleo/GROW)

**Frontend:**
[https://grow-orcin-ten.vercel.app/](https://grow-orcin-ten.vercel.app/)

**Backend:**
[https://grow-backend-4hfd.onrender.com](https://grow-backend-4hfd.onrender.com)

---

## 📄 License

This project is developed as an academic/project work.

---

## ⭐ Acknowledgement

Built as a full-stack student project to explore modern web development, authentication, database management, cloud file storage, and deployment.

````

### After replacing the README

Run:

```bash
git add README.md
git commit -m "Improve project README"
git push origin main
````
