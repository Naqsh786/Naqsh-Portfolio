export const profile = {
  name: "Naqsh",
  role: "Full-Stack Developer",
  description: "I craft modern, performant web applications with clean code and stunning user experiences. Specializing in immersive 3D web experiences and neon-themed UI/UX.",
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
    title: "Naqsh Events – Full-Stack Event Management Portal",
    description: "A robust and scalable Event Management System designed to streamline event planning and booking. This project features a dynamic dashboard for real-time tracking, secure user authentication, and a responsive UI. Built with a focus on performance and seamless user experience using a modern MERN-style architecture.",
    technologies: ["React Vite", "Node.js Express.js", "MongoDB", "Redux"],
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
    liveDemo: "https://hotel-managment-system-f.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/client",
    gitBackend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/server",
  }
];
