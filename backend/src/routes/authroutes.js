import express from "express"
import {
  register,
  login,
  refresh,
  logout,
  me
} from "../controllers/auth.controllers.js"
import { otpStore, verifiedEmails } from '../store/otpStore.js';
import { authenticate_token,cookie_validator } from "../middleware/auth.js"
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../services/mailer.js";

const router = express.Router()
// Register

router.post("/register", register)
// Login
router.post("/login", login)
// Refresh access token
router.post("/refresh", cookie_validator) 
router.post("/refresh", refresh)
// Logout
router.post("/logout", logout)
// Get current user (protected)
router.get("/me", authenticate_token, me)


router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min TTL

  otpStore.set(email, { otp, attempts: 0, expiresAt });

  await sendEmail({
    to: email,
    subject: 'Your Fundo OTP',
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
  });

  res.json({ message: 'OTP sent' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

  const record = otpStore.get(email);

  if (!record) return res.status(400).json({ error: 'OTP not found or expired' });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP expired' });
  }
  if (record.attempts >= 3) {
    otpStore.delete(email);
    return res.status(429).json({ error: 'Too many attempts' });
  }
  if (record.otp !== otp) {
    record.attempts++;
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  otpStore.delete(email); // delete on success
  res.json({ message: 'OTP verified' });
});

export default router