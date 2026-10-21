# 🚀 Naqsh — Full-Stack & 3D Web Developer Portfolio

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A state-of-the-art **Full-Stack MERN Portfolio** featuring interactive **3D WebGL graphics**, a **Futuristic Sci-Fi HUD Preloader**, custom **Theme Switching Engine**, a premium **Services Showcase**, interactive **Cursor Dot Trail**, **Ridgeline Terrain** contact background, a physics-based **Interactive Footer**, and an encrypted **Admin Portal** for managing real-time contact inquiries.

---

## 🌟 Key Features

### 🌌 3D Holographic Canvas
* Powered by `@react-three/fiber` and `@react-three/drei`.
* Centered 3D Holographic Portal with floating wireframe geometric shapes, dynamic light sources, and particle fields.
* 60FPS smooth rendering with delta time accumulation.

### ⚡ Futuristic Sci-Fi HUD Preloader
* High-tech interactive boot animation counting from `0%` to `100%`.
* Dual-direction spinning SVG rings, live system telemetry text, and smooth page explosion transition.

### 🎯 Services Showcase
* **4 premium service cards** in a 2×2 responsive grid: Full-Stack Web Applications, Interactive UI/UX & 3D Experiences, Backend APIs & Cloud Architecture, and Performance, SEO & Modernization.
* Each card features neon ambient glows, tech stack badges, key deliverables checklists, and a direct **"Inquire Now"** CTA that pre-populates the contact form subject and smooth-scrolls to contact.
* **Execution Framework strip** — a 4-step process overview ("How Ideas Become Production Reality") showcasing the development workflow from Discovery to Launch.

### 🖱️ Cursor Dot Trail
* Custom animated cursor with glowing dot trail effect that follows mouse movement.
* Smooth interpolation and fade-out for a polished, premium feel.

### 🏔️ Ridgeline Terrain Contact Background
* Animated ridgeline mountain terrain rendered on HTML Canvas behind the contact form.
* Creates a dynamic, living backdrop that elevates the contact section's visual impact.

### 🦶 Interactive Physics Footer
* Gravity-based interactive footer with draggable skill badges.
* Built with Matter.js physics engine — badges react to mouse interaction with realistic physics.
* Includes quick navigation links, back-to-top, and a "Replay Intro" button.

### 🔒 Secured Admin Dashboard
* Password-protected authentication powered by **JWT (JSON Web Tokens)**.
* Password input features a show/hide Eye toggle and pre-fill protection.
* Real-time Bento stats display (**Total Messages**, **Unread Messages**, **Read Messages**).
* Instant search filter by name, email, subject, or message content.
* Ability to mark messages as Read/Unread or permanently delete them.

### 🎨 Dynamic Multi-Theme Engine
* Switch between **Cyberpunk**, **Matrix**, and **Sunset** themes on the fly.
* CSS custom properties handle instant palette changes without page reloads.

### 💾 Dual-Mode Backend Data Layer
* Built with **Node.js** and **Express.js**.
* Connects directly to local or cloud **MongoDB** via Mongoose.
* Includes automatic memory fallback so the app stays functional even when database connection is offline.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Three.js, React Three Fiber, React Three Drei, TailwindCSS, Framer Motion, React Icons, React Router DOM |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JSONWebToken, CORS, Dotenv, Nodemon |
| **Styling** | Custom Glassmorphism, TailwindCSS, CSS Variables, Neon Glow Effects |
| **Physics** | Matter.js (Footer), Canvas API (Ridgeline Terrain, Cursor Trail) |
| **Version Control** | Git & GitHub |

---

## 📁 Directory Structure

```text
Naqsh-Portfolio/
├── Backend/
│   ├── config/
│   │   └── db.js                     # MongoDB Mongoose Connection
│   ├── controllers/
│   │   ├── adminController.js        # Admin Auth & Message Management
│   │   └── contactController.js      # Contact Form Inquiries
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT Bearer Token Verification
│   ├── models/
│   │   └── Message.js                # Mongoose Message Schema
│   ├── routes/
│   │   ├── adminRoutes.js            # Admin API Routes
│   ├── .env.example                  # Environment Variables Template
│   ├── app.js                        # Express App Setup
│   ├── server.js                     # Server Entry Point
│   └── package.json
│
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CursorDotTrail.jsx    # Animated Cursor Dot Trail Effect
│   │   │   ├── FooterField.jsx       # Physics-Based Interactive Footer
│   │   │   ├── GlowCursor.jsx        # Glow Cursor Effect
│   │   │   ├── GridTrails.jsx        # Grid Trail Animations
│   │   │   ├── Navbar.jsx            # Sticky Glass Navbar & Scroll Spy
│   │   │   ├── RidgelineTerrain.jsx  # Animated Mountain Canvas Background
│   │   │   ├── ServicesSection.jsx   # Premium 4-Card Services Showcase
│   │   │   └── Starfield.jsx         # Starfield Background Effect
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Hero, Skills, Projects, Services, Contact
│   │   │   └── AdminDashboard.jsx    # Admin Management Portal
│   │   ├── data.js                   # Profile & Project Data
│   │   ├── App.jsx                   # Main App & Router
│   │   ├── index.css                 # Global Styles & Theme Variables
│   │   └── main.jsx                  # App Entry Point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 📋 Sections Overview

| Section | Description |
| :--- | :--- |
| **Hero** | Full-screen intro with 3D canvas, profile portrait, animated tagline, and CTA buttons |
| **Skills** | Animated skill badges with proficiency indicators |
| **Projects** | Responsive project showcase grid with live demo & GitHub links + "View More on GitHub" button |
| **Services** | 4 premium service cards with deliverables, tech stacks, inquiry CTAs, and execution framework |
| **Contact** | Glassmorphic contact form with Ridgeline Terrain background and service pre-population |
| **Footer** | Physics-based interactive footer with draggable badges, quick links, and replay intro |

---

## ⚙️ Installation & Setup Guide

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) and [MongoDB](https://www.mongodb.com/) installed locally.

### 2. Clone the Repository
```bash
git clone https://github.com/Naqsh786/Naqsh-Protfolio.git
cd Naqsh-Protfolio
```

---

### 3. Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying `.env.example`:
   ```bash
   copy .env.example .env
   ```
   Or create a `.env` file in the `Backend` folder with placeholder variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri_here
   ADMIN_PASSWORD=your_secure_admin_password
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *(Server will run on `http://localhost:5000` with Nodemon watching for changes).*

---

### 4. Frontend Setup
1. Open a new terminal and navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser!

---

## 🔐 Admin Access

1. Navigate to `http://localhost:5173/admin` or click the 🔒 lock icon in the Navbar.
2. Enter the password defined in `ADMIN_PASSWORD` in your `Backend/.env` file.
3. Use the Eye Icon to toggle password visibility.
4. Unlock the dashboard to manage contact inquiries!

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Designed & Developed with ❤️ by <b>Naqsh</b>
</p>
