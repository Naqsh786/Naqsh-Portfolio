export const profile = {
  name: "Naqsh",
  role: "Full-Stack Developer",
  description: "Specialized in creating modern, responsive, and performance-first web applications powered by clean architecture. Delivering immersive 3D experiences, smooth animations, and intuitive UI/UX that transform ideas into exceptional digital products.",
  imageUrl: "/12006.png",
  availableForWork: true,
  frontendSkills: [
    "HTML5/CSS3",
    "JavaScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "React Three Fiber",
    "Redux Toolkit"
  ],
  backendSkills: [
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "JWT Authentication"
  ],
  databaseSkills: [
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "Redis"
  ],
  tools: [
    "Git & GitHub",
    "Docker",
    "Postman",
    "Figma"
  ],
};

export const projects = [
  {
    _id: "1",
    title: "Majestic Events – Full-Stack Event Planning & Booking Platform",
    description: "A full-stack event planning platform to explore and book premium events — Weddings, Birthdays, Mehendi, and Valima. Includes an admin panel with category & slide management, real-time chat, user management, and review moderation, with secure Google & OTP authentication and a serverless backend.",
    technologies: ["React.js", "Vite", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary"],
    imageUrl: "/events.png",
    liveDemo: "https://event-managment-f.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Event-Managment/tree/main/FrontEnd/web",
    gitBackend: "https://github.com/Naqsh786/Event-Managment/tree/main/Backend",
  },
  {
    _id: "2",
    title: "Sona Hotel – Luxury Hotel Management & Booking System",
    description: "A hotel management and room booking system with role-based dashboards (Admin, Staff, Guest), real-time booking, interactive room filters, Stripe checkout, food ordering inventory, and dynamic business charts — optimized for serverless hosting with Cloudinary asset management.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Stripe API", "Cloudinary"],
    imageUrl: "/hotel.png",
    liveDemo: "https://hotel-managment-system-wheat.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/client",
    gitBackend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/server",
  },
  {
    _id: "3",
    title: "AURA FIT – Premium Gym Management & Class Booking Platform",
    description: "A fitness management platform where members register, book classes with live capacity tracking, buy memberships via Stripe, track BMI, and manage profiles. Admins control subscriptions, class scheduling, trainers, bookings, inquiries, and newsletters — with a glassmorphism UI, Framer Motion & GSAP animations, and a 3D hero.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "JWT Auth", "Cloudinary"],
    imageUrl: "/gym1.png",
    liveDemo: "https://gym-managment-system-ebon.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Gym-Managment-System/tree/main/frontend",
    gitBackend: "https://github.com/Naqsh786/Gym-Managment-System/tree/main/backend",
  },
  {
    _id: "4",
    title: "Jesko Jets – Luxury Aviation & Private Jet Charter Experience",
    description: "An immersive 3D animation-driven Next.js web application for luxury private jet chartering. Features high-performance canvas image sequence rendering, smooth Lenis scroll dynamics, Framer Motion UI animations, interactive aircraft showcase, and futuristic luxury aesthetic.",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    imageUrl: "/jesko.png",
    liveDemo: "https://jesko-jets.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Jesko-Jets",
    gitBackend: "",
  }
];
