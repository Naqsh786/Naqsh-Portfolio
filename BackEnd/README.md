# Naqsh Portfolio - Backend API

This repository contains the REST API server powering my personal web portfolio. It manages projects, an admin portal, and image handling to ensure a robust, fast, and secure backend ecosystem.

## 🚀 Tech Stack

- **Node.js** & **Express** to create a lightweight, robust, and extensible server logic.
- **MongoDB** & **Mongoose** for storing and validating NoSQL documents.
- **Cloudinary** & **Multer** for seamless handling and storage of high-quality image files.
- **JSON Web Tokens (JWT)** for secure, stateless admin authentication.

## ✨ Features

- **Project Management API**: Full CRUD (Create, Read, Update, Delete) routes to easily manage portfolio projects.
- **Admin Authentication**: Routes secured via JWT so only administrators can modify the project database.
- **Image Processing**: An `/api/projects/upload` route linked to Cloudinary that uploads assets directly into the cloud.
- **Cloud Optimized**: Designed specifically to connect, serve, and gracefully recover on Serverless environments such as **Vercel**.

## 📦 Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Environment Setup**: Copy `.env.example` configurations and add your MongoDB database URI, JWT Secreet, and Cloudinary Keys.
4. **Run Server**: `npm start` (Runs locally on port 7000 by default).

Developed to perfectly match the Next/React Frontend. Built by Naqsh.
