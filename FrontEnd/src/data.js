export const profile = {
  name: "Naqsh",
  role: "Full-Stack Developer",
  description: "Full-stack developer building fast, reliable web applications with React, Next.js, TypeScript, and Node.js. Focused on scalable backend systems, clean API design, and interactive UI experiences.",
  imageUrl: "/12006.png",
  availableForWork: true,
  frontendSkills: [
    "TypeScript",
    "JavaScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "HTML5/CSS3",
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
    "PostgreSQL",
    "Supabase",
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
    title: "Majestic Events – Full-Stack Event Booking Platform",
    description: "Full-stack event booking platform with dedicated client and admin workflows. Features Google OAuth and OTP verification, real-time customer-organizer chat, package customization, dynamic slide management, and Cloudinary media pipelines.",
    technologies: ["React.js", "Vite", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary"],
    imageUrl: "/events.png",
    liveDemo: "https://event-managment-f.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Event-Managment/tree/main/FrontEnd/web",
    gitBackend: "https://github.com/Naqsh786/Event-Managment/tree/main/Backend",
  },
  {
    _id: "2",
    title: "Sona Hotel – Hotel Management & Room Reservation System",
    description: "Hotel reservation and inventory management system with role-based access for Admins, Staff, and Guests. Includes live room filtering, Stripe checkout integration, food ordering POS module, dynamic revenue charts, and Cloudinary asset optimization.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Stripe API", "Cloudinary"],
    imageUrl: "/hotel.png",
    liveDemo: "https://hotel-managment-system-wheat.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/client",
    gitBackend: "https://github.com/Naqsh786/Hotel-Managment-System/tree/main/server",
  },
  {
    _id: "3",
    title: "AURA FIT – Fitness Management & Class Booking Platform",
    description: "Gym management system with membership subscriptions via Stripe, real-time class booking with capacity limits, and member BMI tracking. Features an admin dashboard for trainer schedules, booking inquiries, and interactive 3D canvas visuals with Framer Motion and GSAP.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "JWT Auth", "Cloudinary"],
    imageUrl: "/gym1.png",
    liveDemo: "https://gym-managment-system-ebon.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Gym-Managment-System/tree/main/frontend",
    gitBackend: "https://github.com/Naqsh786/Gym-Managment-System/tree/main/backend",
  },
  {
    _id: "4",
    title: "Jesko Jets – Private Jet Charter Experience",
    description: "Private jet charter web application built with Next.js and TypeScript. Implements 60fps canvas image sequence scrubbing synchronized with Lenis smooth scrolling, interactive aircraft specs inspection, and responsive layout architecture.",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    imageUrl: "/jeskojets.png",
    liveDemo: "https://jesko-jets-sepia.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/Jesko-Jets",
    gitBackend: "",
  },
  {
    _id: "5",
    title: "AgencySpire – Digital Agency Website",
    description: "Agency presentation and client intake platform with a responsive dark-mode interface. Features structured service showcases, dynamic case study previews, interactive UI micro-animations, and an asynchronous contact inquiry pipeline.",
    technologies: ["React", "Vite", "JavaScript", "Tailwind CSS", "Node.js", "Express.js"],
    imageUrl: "/agencyspire.png",
    liveDemo: "https://agencyspire.vercel.app/",
    gitFrontend: "https://github.com/Naqsh786/AgencySpire/tree/main/client",
    gitBackend: "https://github.com/Naqsh786/AgencySpire/tree/main/server",
  }
];
