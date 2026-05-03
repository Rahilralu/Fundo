# ⚡️ Fundo

**A platform where organisers create events and students pay online — and everything is tracked automatically.**

---

## 🛑 The Problem
Collecting money for college events is broken.
Someone wants to organise a trip or an event. They ask 20 people for money. Some pay in cash, some say "I'll pay later", some forget. The organiser has no list, no record, no idea who paid ₹500 and who paid nothing. At the end, it's a mess of screenshots and WhatsApp messages.

**Fundo fixes this entirely.**

---

## 🎟️ The Two Types of Events

### 1. Public Event
- Visible to everyone on the main dashboard when they open Fundo.
- Anyone from the campus can see it, click on it, and pay to register.
- **Best for:** College fests, competitions, seminars — events that are open to everyone.

### 2. Private Event
- Hidden from the dashboard.
- The organiser gets a unique link and shares it only with specific people. Only someone with that link can access and pay.
- **Best for:** Club trips, department outings, or restricted gatherings.

---

## 💸 How a Payment Works — Step by Step

1. **Student opens the event** — either from the dashboard (public) or from the link shared by the organiser (private).
2. **Student clicks Pay** — Razorpay's checkout window opens. They can pay via UPI, card, net banking, anything.
3. **Payment goes to Razorpay** — Razorpay processes the money and sends a secret signal (called a webhook) to Fundo's backend saying "this person paid".
4. **Fundo verifies the signal** — the backend checks a secret signature to make sure the signal is genuinely from Razorpay and not a fake. This is the security layer.
5. **Record is saved** — the database now has: who paid, how much, at what time. Permanently. No manual entry needed.
6. **Organiser's dashboard updates live** — the moment a payment is confirmed, the organiser sees it appear in real time without refreshing the page. *(Powered by Socket.io)*

---

## 👥 Who Uses It & What They Get

### For the Organiser (Student club, department, individual)
- **Live payment dashboard:** A screen that shows every payment as it happens (Name, amount, time). No refresh needed.
- **CSV export:** Download the entire payment list as a spreadsheet. Useful for submitting records to a college, treasurer, or faculty coordinator.
- **Zero manual work:** The organiser never has to chase people for payment screenshots or manually mark who paid. The system does all of it.

### For the Participant (Student)
- **Simple, familiar checkout:** They just click Pay, use UPI or card like any other app, and they're done. No separate app to download. No cash needed.
- **Proof of payment:** Their payment is recorded in the system. No need to keep a screenshot or argue later about whether they paid.

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js with ES Modules
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (Access & Refresh Tokens)
- **Caching:** Redis for rate limiting
- **Security:** bcrypt for password hashing, Helmet for headers, CORS
- **Email:** Nodemailer for OTP verification
- **Payments:** Razorpay integration (planned)
- **Real-time:** Socket.io for live updates (planned)

### Frontend
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS with custom gradients
- **UI Components:** Radix UI primitives
- **Animations:** Framer Motion
- **3D Graphics:** Spline for interactive backgrounds
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### DevOps & Tools
- **Version Control:** Git
- **Linting:** ESLint
- **Build Tool:** Vite for frontend, Nodemon for backend dev
- **Database Migrations:** Prisma Migrate

---

## 📁 Project Structure

```
fundo/
├── backend/
│   ├── index.js                 # Server entry point
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── migrations/          # DB migrations
│   └── src/
│       ├── config/
│       │   └── psql.js          # Prisma client config
│       ├── controllers/
│       │   ├── auth.controllers.js
│       │   └── otp.controllers.js    # (Empty - next feature)
│       ├── middleware/
│       │   ├── auth.js          # JWT authentication
│       │   └── ratelimiter.js   # Rate limiting
│       ├── routes/
│       │   ├── authroutes.js    # Auth endpoints
│       │   └── index.js         # Route aggregator
│       ├── services/
│       │   ├── auth.service.js  # Auth business logic
│       │   ├── mailer.js        # Email service (empty)
│       │   └── razorpay.js      # Payment service (empty)
│       ├── sockets/
│       │   └── paymentsocket.js # Real-time updates (empty)
│       └── utils/
│           └── tokens.js        # JWT utilities
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api/
│   │   │   └── tokens.js        # API utilities
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── LoginPage.jsx    # Auth page with 3D background
│   │   │   ├── Dashboard.jsx
│   │   │   └── ...              # Other components
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Auth state management
│   │   │   └── ToastContext.jsx # Notifications
│   │   ├── lib/
│   │   │   └── utils.js         # Utility functions
│   │   └── pages/
│   │       ├── Landing.jsx      # Homepage
│   │       ├── EventsList.jsx
│   │       └── ...
│   └── public/
└── README.md
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)
- Redis (for rate limiting)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env` file and update values:
   ```env
   PORT=8000
   ACCESS_TOKEN_SECRET=<your-secret>
   REFRESH_TOKEN_SECRET=<your-secret>
   SALT=10
   REDIS_HOST=localhost
   REDIS_PORT=6379
   DATABASE_URL="postgresql://username:password@localhost:5432/fundo"
   OWNER_MAIL=<your-email>
   OWNER_PASSWORD=<your-password>
   GMAIL_USER=<gmail-username>
   GMAIL_PASS=<gmail-app-password>
   ```

4. **Set up database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Full Stack Development

1. **Start backend** (from backend directory):
   ```bash
   npm run dev
   ```

2. **Start frontend** (from frontend directory in new terminal):
   ```bash
   npm run dev
   ```

3. **Access the app:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

---

## 🔐 Authentication Flow

### Current Implementation
- **Registration:** User creates account with name, email, password, role
- **Login:** Email/password authentication with JWT tokens
- **Token Management:** Access tokens (short-lived) + Refresh tokens (stored in HTTP-only cookies)
- **Protected Routes:** Middleware validates JWT on protected endpoints
- **Logout:** Clears refresh token from database and cookies

### Next Steps
- **OTP Verification:** Email-based verification for account activation
- **Password Reset:** Forgot password flow with OTP

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user
- `GET /me` - Get current user info (protected)

### Planned Endpoints
- `POST /verify-otp` - Verify email with OTP
- `POST /resend-otp` - Resend verification OTP
- `POST /events` - Create event (organisers only)
- `GET /events` - List public events
- `POST /payments/create-order` - Create Razorpay order
- `POST /payments/webhook` - Razorpay webhook handler

---

## 🗄️ Database Schema

### Current Models
- **users:** User accounts with roles (student/organiser)
- **refresh_tokens:** JWT refresh tokens storage

### Planned Models
- **events:** Event details (title, description, price, capacity, type)
- **payments:** Payment records linked to events and users
- **event_participants:** Many-to-many relationship for event registrations

---

## 🔒 Security Features

- **Password Hashing:** bcrypt with configurable salt rounds
- **JWT Tokens:** Secure token-based authentication
- **HTTP-Only Cookies:** Refresh tokens stored securely
- **Rate Limiting:** Express rate limiter with Redis
- **CORS:** Configured for frontend origin
- **Helmet:** Security headers
- **Input Validation:** Zod schemas (planned)

---

## 🚧 Development Roadmap

### Phase 1: Authentication ✅
- User registration and login
- JWT-based authentication
- Role-based access (student/organiser)

### Phase 2: OTP Verification 🔄 (Current)
- Email verification with OTP
- Password reset functionality

### Phase 3: Event Management
- Create public/private events
- Event listing and details
- Organiser dashboard

### Phase 4: Payment Integration
- Razorpay payment gateway
- Webhook handling
- Payment tracking

### Phase 5: Real-time Features
- Socket.io for live updates
- Real-time payment notifications
- Live dashboard updates

### Phase 6: Advanced Features
- CSV export for organisers
- Event analytics
- Admin panel

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Contact

For questions or support, please reach out to the development team.