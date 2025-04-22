📝 Notes Application – Full Stack MERN Project

🚀 Live Demo:[ notes-application-2-vv1k.onrender.com
](https://notes-application-2-vv1k.onrender.com/)
This is a secure, full-stack Notes Application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, login, and manage personal notes with complete CRUD operations. Security and modern development practices are implemented including JWT-based authentication, protected API routes, and bcrypt password hashing. The frontend is styled using Tailwind CSS and built with Vite for fast development.

🔐 Features
✅ User Authentication

Secure Register/Login with hashed passwords using bcrypt

Authentication using JWT stored in HttpOnly cookies

Token verification on every request for extra safety

🛡️ Protected Routes

Backend middleware to ensure only logged-in users can access/modify notes

/user/verify endpoint verifies user session on every reload

📝 Notes CRUD

Create, Read, Update, Delete notes

Real-time updates after each operation

Each note contains a title, description, and timestamp

🎨 Frontend

Built using React with Vite for lightning-fast performance

Styled beautifully using TailwindCSS

Routing with React Router DOM

📦 Backend

Express.js server with RESTful API Email verification using NodeMailer

MongoDB database for storing users and notes

Middleware-based structure for clean code and scalability

🛠️ Technologies Used
Frontend:
React

React Router DOM

Tailwind CSS

Axios

Vite

Backend:
Node.js

Express.js

MongoDB (Mongoose)

JWT (jsonwebtoken)

Bcrypt

CORS

Dotenv

📂 Project Structure

📦 Notes-Application/
├── client/                # React Frontend
│   ├── src/
│   │   ├── context/       # Context API for user state
│   │   ├── pages/         # Home, Login, Register
│   │   ├── components/    # Reusable UI components
│   │   └── axiosInstance.js
│
└── server/                # Node.js + Express Backend
    ├── controllers/       # Controller logic
    ├── middleware/        # Auth middleware
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    └── config/            # DB config & environment variables

⚙️ How to Run Locally
Backend
cd server
npm install
npm start

💻 Frontend:
cd client
npm install
npm run dev


 Acknowledgements
Big shoutout to the open-source community!
This app was made to practice real-world full-stack development using modern tech.

🧑‍💻 Developed By
Tinkal Kumar
Full Stack Developer 



