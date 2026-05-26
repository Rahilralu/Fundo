# ⚡️ Fundo

**Fundo is a college event payment platform for organisers and students.**
It helps organisers create events, collect online payments via Razorpay, and track every transaction in one place.

---

## 🚀 What Fundo Solves

College event payments are often handled with cash, screenshots, and scattered messages.
Fundo provides a single system for:

- creating event registration pages,
- collecting payments online,
- recording payment status in the database,
- viewing transaction history,
- and controlling access for private events.

---

## ✅ Implemented Features

- User registration and login with **JWT access tokens** and **refresh token rotation**
- Protected backend routes for user profile, event management, and transactions
- Event creation, update, and deletion with **image upload support**
- Public event listing and event detail retrieval
- Razorpay **order creation** and **payment verification**
- Transaction history queries for both current user and all transactions
- Redis connection + rate limiting for backend request control
- Tailwind + React frontend with landing page, auth flows, dashboard, and event pages
- OTP verification UI built into the frontend experience

---

## 🧱 Tech Stack

### Backend

- Node.js + Express
- PostgreSQL + Prisma
- JWT authentication
- Redis for connectivity and rate limiting
- Razorpay SDK for payment orders and verification
- Cloudinary-backed uploads via multer
- Helmet, CORS, and express-rate-limit security

### Frontend

- React 19 + Vite
- Tailwind CSS
- Framer Motion for animations
- React Router DOM for navigation
- Spline for interactive 3D background visuals

---

## 📁 Project Structure

```
fundo/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── store/
│   │   └── utils/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── lib/
│   │   └── App.jsx
└── README.md
```

---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/fundo
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
SALT=10
REDIS_URL=redis://localhost:6379
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Run migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Start the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` with:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start the frontend app:

```bash
npm run dev
```

---

## 📌 Scripts

### Backend (`backend/package.json`)

- `npm run dev` — run server with nodemon
- `npm test` — placeholder

### Frontend (`frontend/package.json`)

- `npm run dev` — run Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — lint code

---

## 💡 Notes

- The backend exposes `api/auth`, `api/events`, and `api/transactions` routes.
- The frontend includes auth, event browsing, dashboard, and private invite flows.
- Razorpay order and verification logic is implemented in backend services.
- OTP verification has UI support; backend OTP controllers exist for future route wiring.

---

## 📬 Next Steps

- deploy backend and frontend to a cloud environment
- add real-time Socket.io updates for payments
- enable OTP APIs end-to-end
- add end-to-end tests and CI configuration
