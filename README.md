<div align="center">
🛍️ Shop-Compair
Smart Price Comparison Platform
Compare prices across Amazon, Flipkart, Myntra, Nykaa & more — instantly!
Show Image
Show Image
Show Image
Show Image Show Image Show Image
</div>

🌐 Live Links
ServiceURL🎯 Frontend (Live Demo)shop-compair.vercel.app⚙️ Backend APIshop-compair.onrender.com📦 GitHub Repositorygithub.com/Srishtiverma12/shop-compair

✨ Features

🔍 Smart Price Comparison — Paste any product URL and compare prices across platforms
🛒 Multi-Platform Support — Amazon, Flipkart, Myntra, Nykaa & more
❤️ Wishlist — Save products and track best deals
📊 Comparison History — View all your past comparisons
🔐 Secure Auth — JWT-based login & signup
👤 User Profile — Manage your account and settings
📱 Responsive Design — Works on all devices
🌙 Dark UI — Modern dark themed interface


🛠️ Tech Stack
Frontend
TechnologyUsage⚛️ React 18UI Framework⚡ ViteBuild Tool🔀 React Router v6Client-side Routing📡 AxiosHTTP Requests🔔 React Hot ToastNotifications🎨 CSS-in-JSInline Styling
Backend
TechnologyUsage🟢 Node.jsRuntime🚂 Express.jsWeb Framework🐘 PostgreSQLDatabase🔑 JWTAuthentication🔒 bcryptjsPassword Hashing🌐 CORSCross-Origin Requests🕷️ ScraperAPIProduct Data Scraping
Deployment
ServicePurpose🔺 VercelFrontend Hosting🎨 RenderBackend Hosting🐘 Render PostgreSQLDatabase Hosting🐙 GitHubVersion Control

📁 Project Structure
shop-compair/
├── frontend/                  # React + Vite App
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── api.js
│   └── package.json
│
└── backend/                   # Node.js + Express API
    ├── controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   └── userController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   └── userRoutes.js
    ├── config/
    │   └── db.js
    ├── utils/
    │   └── emailService.js
    └── server.js

🚀 Getting Started Locally
Prerequisites

Node.js v18+
PostgreSQL
Git

1. Clone the Repository
bashgit clone https://github.com/Srishtiverma12/shop-compair.git
cd shop-compair
2. Backend Setup
bashcd backend
npm install
Create .env file in backend/:
envPORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=shopcompair
DB_PORT=5432
JWT_SECRET=your_jwt_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
SCRAPER_API_KEY=your_scraper_api_key
FRONTEND_URL=http://localhost:5173
bashnode server.js
3. Frontend Setup
bashcd frontend
npm install
Create .env file in frontend/:
envVITE_API_URL=http://localhost:5000
bashnpm run dev
4. Database Setup
Run these SQL commands in PostgreSQL:
sqlCREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password TEXT NOT NULL,
  profile_pic TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  otp VARCHAR(10),
  otp_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comparisons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_url TEXT NOT NULL,
  product_name TEXT,
  product_image TEXT,
  results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_image TEXT,
  best_price NUMERIC,
  best_platform VARCHAR(50),
  product_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

📡 API Endpoints
Auth Routes /api/auth
MethodEndpointDescriptionPOST/signupRegister new userPOST/loginLogin userPOST/forgot-passwordRequest password resetPOST/reset-passwordReset password
Product Routes /api/product
MethodEndpointDescriptionPOST/compareCompare product pricesGET/historyGet comparison historyPOST/wishlistAdd to wishlistGET/wishlistGet wishlistDELETE/wishlist/:idRemove from wishlist
User Routes /api/user
MethodEndpointDescriptionPUT/profileUpdate profilePUT/change-passwordChange passwordDELETE/delete-accountDelete account

🌍 Deployment
Frontend — Vercel
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Environment Variable: VITE_API_URL = https://shop-compair.onrender.com
Backend — Render
Root Directory: backend
Build Command: npm install
Start Command: node server.js

👩‍💻 Developer
<div align="center">
Srishti Verma
Show Image
</div>

<div align="center">
⭐ If you liked my project do give a star! ⭐
Made with ❤️ by Srishti Verma
</div>
