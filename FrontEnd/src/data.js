export const profile = {
  name: "Naqsh",
  role: "Full-Stack Developer",
  description: "Specialized in creating modern, responsive, and performance-first web applications powered by clean architecture. Delivering immersive 3D experiences, smooth animations, and intuitive UI/UX that transform ideas into exceptional digital products.",
  imageUrl: "/12006.png",
  availableForWork: true,
  frontendSkills: [
    "HTML5/CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "Tailwind CSS",
    "React Three Fiber",
    "Redux Toolkit"
  ],
  backendSkills: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "RESTful APIs",
    "JWT Authentication"
  ],
};

export const projects = [
  {
    _id: "1",
    title: "Majestic Events – Full-Stack Event Planning & Booking Platform",
    description: "A feature-rich event management platform where users can explore and book premium events like Weddings, Birthdays, Mehendi, and Valima ceremonies. Includes a powerful admin panel with category management, slide management, real-time chat system, user management, and review moderation. Features secure Google & OTP-based authentication, responsive glassmorphism UI, and a fully deployed serverless backend.",
    technologies: ["React.js", "Vite", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary"],
    imageUrl: "/events.png",
    liveDemo: "https://event-managment-f.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Event-Managment/tree/main/FrontEnd/web",
    gitBackend: "https://github.com/Naqsh786/Event-Managment/tree/main/Backend",
  },
  {
    _id: "2",
    title: "Sona Hotel – Luxury Hotel Management & Booking System",
    description: "An advanced hotel management and room booking application featuring role-based dashboards (Admin, Staff, and Guest). Includes real-time booking, interactive room filters, Stripe checkout integration, food ordering inventory, and dynamic business charts. Fully optimized for cold starts on serverless hosting with Cloudinary asset management.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Stripe API", "Cloudinary"],
    imageUrl: "/hotel.png",
    liveDemo: "https://hotel-managment-system-wheat.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/client",
    gitBackend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/server",
  }
];
