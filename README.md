# 🛍️ Shop-Compair
### Smart Price Comparison — Find Best Deals Instantly!

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Site-7c3aed?style=for-the-badge&logoColor=white)](https://shop-compair.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙️%20Backend%20API-Render-10b981?style=for-the-badge)](https://shop-compair.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/📦%20GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Srishtiverma12/shop-compair)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)

</div>

---

## 🌟 What is Shop-Compair?

**Shop-Compair** is a full-stack web app that lets you **compare product prices across multiple e-commerce platforms in seconds.** Just paste a product URL — Amazon, Flipkart, Myntra, Nykaa — and instantly see the best deal.

> 💡 Stop overpaying. Start comparing.

---

## 🔗 Live Links

| 🔗 | Link |
|---|------|
| 🎯 **Live App** | https://shop-compair.vercel.app |
| ⚙️ **Backend API** | https://shop-compair.onrender.com |
| 💻 **Source Code** | https://github.com/Srishtiverma12/shop-compair |

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔍 **Instant Comparison** | Paste any product URL and compare across platforms |
| 🏆 **Best Deal Highlight** | Automatically shows the cheapest option |
| ❤️ **Wishlist** | Save products and monitor prices |
| 📊 **History** | Track all your past comparisons |
| 🔐 **Secure Auth** | JWT-based authentication |
| 👤 **Profile Management** | Update name, phone, password |
| 📱 **Fully Responsive** | Works on mobile, tablet, desktop |
| 🌙 **Dark Mode UI** | Sleek modern dark interface |

---

## 🛠️ Tech Stack

### 🖥️ Frontend
React 18        →  UI Framework
Vite            →  Lightning fast build tool
React Router v6 →  Client-side navigation
Axios           →  API communication
React Hot Toast →  Beautiful notifications

### ⚙️ Backend
Node.js         →  Runtime environment
Express.js      →  REST API framework
PostgreSQL       →  Relational database
JWT             →  Authentication tokens
bcryptjs        →  Password encryption
ScraperAPI      →  Product data scraping

### ☁️ Deployment
Vercel          →  Frontend hosting
Render          →  Backend + Database hosting
GitHub          →  Version control & CI/CD

---

## 📁 Folder Structure
shop-compair/
│
├── 📂 frontend/
│   └── src/
│       ├── pages/          # Login, Signup, Dashboard, Compare, Settings
│       ├── components/     # Navbar, Footer
│       ├── context/        # AuthContext (global state)
│       └── api.js          # Base API URL config
│
└── 📂 backend/
├── controllers/        # Auth, Product, User logic
├── routes/             # API route definitions
├── config/             # Database connection
├── utils/              # Email service
└── server.js           # Entry point

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Srishtiverma12/shop-compair.git
cd shop-compair

# 2. Backend setup
cd backend
npm install
# Create .env file with your credentials
node server.js

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

**Backend `.env`**
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=shopcompair
DB_PORT=5432
JWT_SECRET=your_secret_key
SCRAPER_API_KEY=your_scraper_key
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`**
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Reference
POST   /api/auth/signup          →  Register user
POST   /api/auth/login           →  Login user
POST   /api/auth/forgot-password →  Forgot password
POST   /api/auth/reset-password  →  Reset password
POST   /api/product/compare      →  Compare product prices
GET    /api/product/history      →  Get comparison history
POST   /api/product/wishlist     →  Add to wishlist
GET    /api/product/wishlist     →  Get wishlist
DELETE /api/product/wishlist/:id →  Remove from wishlist
PUT    /api/user/profile         →  Update profile
PUT    /api/user/change-password →  Change password
DELETE /api/user/delete-account  →  Delete account

---

## 👩‍💻 Developer

<div align="center">

### Srishti Verma

[![GitHub](https://img.shields.io/badge/GitHub-Srishtiverma12-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Srishtiverma12)

*Full Stack Developer | React • Node.js • PostgreSQL*

</div>

---

<div align="center">

**If you found this helpful, please ⭐ star the repository!**

*Made with 💜 by Srishti Verma*

</div>
