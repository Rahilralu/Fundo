import rateLimit from 'express-rate-limit'

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many request. Please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,                          // fixed from 100 → 15
  message: { error: "Too many login attempts" },
  standardHeaders: true,
  legacyHeaders: false,
})

export const eventLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: { error: "Too many event details" },
  standardHeaders: true,
  legacyHeaders: false,
})

export const profileLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: { error: "Too many profile details" },
  standardHeaders: true,
  legacyHeaders: false,
})

export const transactionsLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: { error: "Too many transaction attempts" },
  standardHeaders: true,
  legacyHeaders: false,
})

export const razorPayLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { error: "Too many razorpay calls" },
  standardHeaders: true,
  legacyHeaders: false,
})