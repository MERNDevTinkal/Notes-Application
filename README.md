
# 📝 Notes Application – Full Stack MERN Project  

🚀 Live Demo: [https://notes-application-2-vv1k.onrender.com/](https://notes-application-2-vv1k.onrender.com/)  

A secure, full-stack Notes Application built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage personal notes with full CRUD operations. The app follows modern security practices, including JWT authentication, protected routes, and bcrypt password hashing.  

The frontend is built with React + Vite for blazing-fast performance and styled with Tailwind CSS for a clean, responsive design.  

---

## 🔥 Features  

### 🔐 User Authentication
✔ Secure Register/Login with bcrypt password hashing  
✔ JWT-based authentication stored in HttpOnly cookies for security  
✔ Token verification on every request for enhanced safety  

### 🛡️ Protected Routes  
✔ Backend middleware ensures only authenticated users can access notes  
✔ `/user/verify` endpoint maintains user sessions on page reload  

### 📝 Notes CRUD Operations 
✔ Create, Read, Update, Delete notes in real-time  
✔ Each note includes a title, description, and timestamp 

### 🎨 Modern Frontend 
✔ Built with React + Vite for optimized performance  
✔ Styled with Tailwind CSS for a sleek, responsive UI  
✔ Routing handled by React Router DOM**  

### ⚙ Robust Backend
✔ Express.j RESTful API with structured middleware  
✔ MongoDB database for storing users and notes  
✔ Email verification (optional) using Nodemailer  

---

## 🛠️ Tech Stack

| Frontend       | Backend          | Database  | Dev Tools  |
|--------------------|----------------------|---------------|----------------|
| React             | Node.js             | MongoDB       | Vite           |
| React Router DOM  | Express.js          | Mongoose      | Axios          |
| Tailwind CSS      | JWT (jsonwebtoken)  |               | Postman        |
| Context API       | Bcrypt              |               | Render (Hosting) |
| Vite              | CORS                |               |                |

---

## 📂 Project Structure 

```bash
📦 Notes-Application/
├── client/                # React Frontend
│   ├── src/
│   │   ├── context/       # User state management
│   │   ├── pages/         # Home, Login, Register
│   │   ├── components/    # Reusable UI components
│   │   └── axiosInstance.js
│
└── server/                # Node.js + Express Backend
    ├── controllers/       # Business logic
    ├── middleware/        # Authentication checks
    ├── models/            # Mongoose schemas
    ├── routes/            # API endpoints
    └── config/            # DB & environment setup
```

---

## ⚙️ Setup & Run Locally 

### Backend Setup  
```bash
cd server
npm install
npm start  # Starts server on port 5000
```

### Frontend Setup 
```bash
cd client
npm install
npm run dev  # Runs on http://localhost:5173
```

### Environment Variables
Create a `.env` file in `/server` with:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 🚀 Deployment
The app is deployed on Render for backend and frontend hosting.  

---

## 🙌 Acknowledgements
Big shoutout to the open-source community! This project was built to practice real-world full-stack development with modern security and best practices.  

---

## 👨‍💻 Developer
Tinkal Kumar
🔗 [GitHub](https://github.com/MERNDevTinkal) | 


---

