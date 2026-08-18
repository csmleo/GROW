# GROW – Online Student Notes Marketplace

A modern, student-friendly React (Vite) frontend for **GROW – Online Student Notes Marketplace**, where students can buy, sell, and share study notes.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / Navbar.css     # Responsive navigation
│   ├── Footer.jsx / Footer.css     # Footer with links & newsletter
│   └── NoteCard.jsx / NoteCard.css # Reusable note card component
├── pages/
│   ├── Home.jsx / Home.css         # Landing page with hero & sections
│   ├── Login.jsx                   # Login form
│   ├── Signup.jsx                  # Signup form with role selection
│   ├── Browse.jsx / Browse.css     # Notes marketplace with filters
│   ├── Upload.jsx / Upload.css     # Upload notes (2-step wizard)
│   ├── Dashboard.jsx / Dashboard.css # User dashboard with tabs
│   └── Auth.css                    # Shared auth styles
├── data/
│   └── dummyData.js                # Dummy notes, subjects, stats
├── App.jsx                         # Routes
├── main.jsx                        # Entry point
└── index.css                       # Global design system
```

---

## 📄 Pages

| Route         | Page            | Description                                 |
|---------------|-----------------|---------------------------------------------|
| `/`           | Home            | Hero, stats, featured notes, testimonials   |
| `/login`      | Login           | Email + password login form                 |
| `/signup`     | Signup          | Name, email, password + role selection      |
| `/browse`     | Browse Notes    | Search + filters (subject, price, rating)   |
| `/upload`     | Upload Notes    | 2-step: details + file upload + pricing     |
| `/dashboard`  | User Dashboard  | Overview, purchases, uploads, earnings tabs |

---

## 🎨 Design System

- **Font**: Inter (body) + Outfit (headings)
- **Theme**: Dark mode, purple/teal accent palette
- **Components**: Cards, badges, glassmorphism panels, animated bar charts
- **Responsive**: Mobile-first, works on all screen sizes

---

## ⚙️ Tech Stack

- **React 18** with **Vite**
- **React Router v6** for client-side routing
- **Vanilla CSS** with CSS custom properties (design tokens)
- **Dummy data** (no backend required for frontend demo)

---

## 📦 Build for Production

```bash
npm run build
```

---

> **GROW – Online Student Notes Marketplace**  
> Built for students, by students. Share knowledge. Earn together.
