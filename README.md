# 🚀 Modern MERN Quiz App

![Quiz App Banner](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop)

> A full-stack interactive Quiz Application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Feature-rich, responsive, and beautifully designed with glassmorphism aesthetics.

## ✨ Key Features

### 👤 User Features
- **Secure Authentication**: Robust Signup/Login system with JWT.
- **Interactive Quizzes**: Smooth, engaging quiz taking interface.
- **Real-time Results**: Instant scoring and performance feedback.
- **📊 User Dashboard**: Browse available quizzes and track total progress.
- **📜 Quiz History**: Detailed history of all analytics attempts with performance badges.
- **🏆 Global Leaderboards**: Compete with other users for the top spot.

### 🛡️ Admin Features
- **Admin Dashboard**: Overview of system statistics (Total Quizzes, Questions, Users).
- **Quiz Management**: Create, Edit, and Delete quizzes easily.
- **Question Bank**: Dynamic form to add questions with options and correct answers.
- **Performance Tracking**: View analytics for created quizzes.

## 🛠️ Tech Stack

**Frontend:**
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React.js (Vite)**
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) **React Router DOM**
- **Lucide React** (Icons)
- **Axios** (API Requests)

**Backend:**
- ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js**
- ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat) **Express.js**
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB (Mongoose)**
- **JWT** (Authentication)
- **Bcrypt** (Password Hashing)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/rahulnexus2/QuizApp.git
cd QuizApp
```

### 2. Backend Setup
Navigate to the Server directory:
```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the Client directory:
```bash
cd Client
npm install
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in your terminal) to view the app!

## 📸 Screenshots

| User Dashboard | Quiz Interface |
|:---:|:---:|
| *(Add screenshot here)* | *(Add screenshot here)* |

| Admin Dashboard | Leaderboard |
|:---:|:---:|
| *(Add screenshot here)* | *(Add screenshot here)* |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Rahul](https://github.com/rahulnexus2)
