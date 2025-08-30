# Campus Catalyst   
(ongoing project)
- Campus Catalyst is a full-stack web application designed to **connect students, teachers, and administrators** within a university ecosystem.  
- The platform enables users to **share achievements, post project ideas, form teams, and collaborate with mentors**, fostering innovation and community engagement.  

---

## ✨ Features  

- 🔑 **Authentication & Authorization**  
  - Role-based login for Students, Teachers, and Admins  
  - Secure signup/login with SAP ID  

- 📝 **Posts & Engagement**  
  - Share general content or project-related updates (similar to posts vs reels)  
  - Like, comment, and share functionality  
  - File & image uploads with Multer  

- 👥 **Team Building**  
  - Students can form project teams based on interests  
  - Pitch ideas to chosen mentors after forming teams  
  - Transparent mentor assignment (no auto-recommendations)  

- 💬 **Collaboration**  
  - Team-based chat groups  
  - Mentor-student communication channels  

- 📊 **Project Management**  
  - Track project progress reports on student/teacher profiles  
  - Panel-based project evaluation workflow  

---

## 🏗️ Tech Stack  

### Frontend  
- **Next.js** (React Framework)  
- **Redux** for state management (`/reducer` folder)  
- TailwindCSS & ShadCN UI for modern UI  

### Backend  
- **Java** (Spring Boot / Express for API layer if hybrid)  
- **Express.js** for REST APIs (Posts, Users, Auth)  
- **Multer** for media uploads  

### Database  
- **MongoDB** (users, posts, teams, mentors, projects)  

---

## 📂 Project Structure  

```bash
Campus-Catalyst/
├── backend/
│   ├── models/
│   │   ├── users.models.js     # User schema (Student, Teacher, Admin)
│   │   ├── posts.models.js     # General & project posts
│   ├── routes/
│   │   ├── posts.routes.js     # Create, like, comment, share, delete
│   │   ├── users.routes.js     # Auth & profile
│   └── server.js
│
├── frontend/
│   ├── reducer/                # Redux state management
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Next.js pages
│   └── utils/                  # API helpers
│
└── README.md
```

---


## ⚡ Installation
### 1. Clone the repository
- git clone https://github.com/your-username/Campus-Catalyst.git
- cd Campus-Catalyst

### 2. Backend Setup
- cd backend
- npm install
#### Run server
- npm start

### 3. Frontend Setup
- cd frontend
- npm install
#### Run frontend
- npm run dev

### 4. Environment Variables

Create .env files in both backend and frontend with:

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- PORT=5000

## 🚀 Roadmap

 - Student & Teacher Profiles

 - Team Chat Integration

 - Notifications System

 - Admin Dashboard

 - Panel Evaluation Module

 ---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

