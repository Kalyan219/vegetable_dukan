E-Mart Vegetables API Project
Project Overview
This project is a full-stack e-commerce application that fetches vegetables from a backend API stored in MongoDB. Users can view, add to cart, and purchase fresh vegetables through the frontend interface.

Features
Fetch vegetables from backend API
Dynamic cart functionality (Add/Remove items)
Data stored in MongoDB database
Backend powered by Node.js & Express.js
Frontend built with React.js
Authentication & User Management (Optional)
Technologies Used
Frontend:
React.js
React Router
Context API (Cart Management)
CSS (for styling)
Backend:
Node.js
Express.js
MongoDB (Mongoose for database management)
JWT Authentication
Project Structure
📦 e-mart-vegetables
├── 📂 backend
│   ├── 📜 server.js  # Main Express Server
│   ├── 📂 routes     # API Routes
│   ├── 📂 models     # MongoDB Models
│   ├── 📂 controllers # Business Logic
│   ├── 📂 config     # Database Configurations
│
├── 📂 frontend
│   ├── 📜 App.jsx    # Main React Component
│   ├── 📂 pages      # Home, Cart, etc.
│   ├── 📂 components # Reusable UI Components
│   ├── 📂 context    # Cart & API Contexts
│
└── 📜 README.md
⚙ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Kalyan219/e-mart-shopping.git
cd e-mart-shopping
2️⃣ Install Dependencies
Frontend:
cd frontend
npm install
Backend:
cd backend
npm install
3️⃣ Start the Development Servers
Start Backend Server:
cd backend
npm start
Start Frontend:
cd frontend
npm run dev
4️⃣ Open in Browser
http://localhost:3000  # Frontend
http://localhost:5000  # Backend API
API Endpoints
Method	Endpoint	Description
GET	/api/vegetables	Fetch all vegetables
POST	/api/cart	Add item to cart
DELETE	/api/cart/:id	Remove item from cart
License
This project is open-source and available under the MIT License.

Made with ❤️ by Kalyan219
