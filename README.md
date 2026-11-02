# Naqsh — Full-Stack Developer Portfolio

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A full-stack developer portfolio built with React, Next.js, Node.js, Express, and MongoDB. Features interactive 3D WebGL visuals, scrub-synchronized GSAP scroll transitions, an interactive milestone engineering roadmap, 2D physics simulation, and a JWT-protected admin dashboard for inquiry management.

---

## Architecture & Core Features

### 1. Interactive 3D Canvas & WebGL Visuals
* Rendered via `@react-three/fiber` and `@react-three/drei`.
* Central 3D holographic structure with floating geometric wireframes, dynamic lighting, and particle fields.
* Lightweight canvas grid trail background with 60 FPS animation loop.

### 2. Weight Sweep Typographic Preloader
* Variable-weight typographic intro sequence (`000%` to `100%`) tracking simulated asset load progress.
* Hardware-accelerated lift transition revealing the primary interface without layout shifts.

### 3. Milestone Engineering Process Timeline
* Interactive scroll-driven roadmap illustrating system design from requirements to cloud deployment.
* Center neon tracking rail with progressive fill synchronized with viewport scroll depth.
* Alternating milestone cards with deliverables, phase badges, and active state indicators.

### 4. Services Showcase & Pre-populated Inquiries
* 2x2 responsive service matrix: Full-Stack Applications, Interactive Interfaces, Backend APIs, and Performance Optimization.
* Direct inquiry actions that automatically pre-populate the contact form subject and scroll to the contact section.

### 5. Bidirectional GSAP Scroll Engine
* Scrub-driven ScrollTrigger architecture (`scrub: 0.8`) across Skills, Projects, Services, and Contact.
* Smooth forward transitions on scroll down (`opacity: 0 -> 1`) and progressive exit transitions on scroll up (`opacity: 1 -> 0`).
* Eliminates abrupt element resets, jarring re-triggers, and duplicate entrance replays.

### 6. Matter.js 2D Physics Footer
* Interactive physics container with draggable, colliding technology badges.
* Realistic boundary collisions, pointer repulsion forces, and quick utility controls (Replay Intro, Back to Top).

### 7. Protected Admin Management Portal
* JWT-based authentication with protected route verification.
* Message dashboard displaying total, unread, and read message counts.
* Real-time search filters, read status toggling, and database record removal.

### 8. Resilient Backend Architecture
* RESTful Express API with MongoDB Mongoose data persistence.
* Memory fallback layer keeping the client functional if the database instance is unreachable.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Next.js, Vite |
| **Language & Typing** | TypeScript, JavaScript (ESNext) |
| **Styling & UI** | Tailwind CSS, Custom Design System Tokens, Conic Gradients |
| **Motion & Animation** | GSAP, ScrollTrigger, Framer Motion |
| **3D & Graphics** | Three.js, React Three Fiber, React Three Drei, HTML5 Canvas |
| **Physics** | Matter.js |
| **Backend & Runtime** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (with in-memory fallback) |
| **Auth & Security** | JWT (JSON Web Tokens), CORS, Input Sanitization |

---

## Project Structure

```text
Naqsh-Portfolio/
├── Backend/
│   ├── config/
│   │   └── db.js                        # MongoDB Mongoose Connection
│   ├── controllers/
│   │   ├── adminController.js           # Auth & Inquiries Management
│   │   └── contactController.js         # Contact Intake Controller
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT Verification Middleware
│   ├── models/
│   │   └── Message.js                   # Mongoose Message Schema
│   ├── routes/
│   │   ├── adminRoutes.js               # Admin Endpoint Routes
│   │   └── contactRoutes.js             # Public Contact Routes
│   ├── app.js                           # Express App Configuration
│   ├── server.js                        # Server Bootstrap
│   └── package.json
│
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── ShinyButton.jsx      # Tailwind Conic Shimmer Button
│   │   │   │   └── weight-sweep-preloader.jsx # Variable-Weight Preloader
│   │   │   ├── FooterField.jsx          # Matter.js Physics Footer
│   │   │   ├── GridTrails.jsx           # Canvas Grid Animation
│   │   │   ├── MilestoneProcessScroll.jsx # Scroll Process Timeline
│   │   │   ├── Navbar.jsx               # Sticky Navbar & Mobile Drawer
│   │   │   ├── RidgelineTerrain.jsx     # Canvas Terrain Background
│   │   │   ├── ServicesSection.jsx      # Services Matrix & Inquiries
│   │   │   └── Starfield.jsx            # Canvas Particle Background
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx       # Admin Inquiries Console
│   │   │   └── Home.jsx                 # Main Single-Page Portfolio
│   │   ├── data.js                      # Profile & Projects Data Store
│   │   ├── App.jsx                      # App Shell & Router
│   │   ├── index.css                    # Design Tokens & Global CSS
│   │   └── main.jsx                     # Client Entry Point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Naqsh786/Naqsh-Protfolio.git
cd Naqsh-Protfolio
```

### 2. Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ADMIN_PASSWORD=your_secure_admin_password
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *The server runs on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to `FrontEnd`:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local server URL (e.g., `http://localhost:5173` or `http://localhost:5174`).

---

## Admin Portal Access

1. Navigate to `/admin` in the browser or click the lock icon in the Navbar.
2. Enter the credential defined in `ADMIN_PASSWORD` in `Backend/.env`.
3. Manage inbound inquiries, filter by read/unread status, search, or delete records.

---

## Production Build & Quality Validation

Run linting across the codebase:
```bash
cd FrontEnd
npm run lint
```

Generate the optimized production bundle:
```bash
cd FrontEnd
npm run build
```

---

## License

Distributed under the [MIT License](LICENSE).
