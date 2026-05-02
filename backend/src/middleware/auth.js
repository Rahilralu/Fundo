import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js"
import { generateAccessToken } from "../utils/tokens.js"
import crypto from "crypto"

//Protect routes — verify access token from cookie
export const authenticate_token = (req, res, next) => {
  try {
    const token = req.cookies?.access_token

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ 
            success: false, 
            message: "Token expired", 
            code: "TOKEN_EXPIRED" 
          })
        }
        return res.status(403).json({ success: false, message: "Invalid token" })
      }
      req.user = decoded  
      next()
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ── Role guard — use after authenticate_token ──
// Usage: router.get('/route', authenticate_token, authorise('organiser'), handler)
export const authorise = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required: ${roles.join(" or ")}`
      })
    }
    next()
  }
}

// Refresh token validator — verify cookie + check DB
export const cookie_validator = async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token
    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token" })
    }
    // Hash the token to check against DB
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")

    const stored = await prisma.refresh_tokens.findUnique({
      where: { token_hash: tokenHash },
      include: { users: true }
    })

    if (!stored || stored.expires_at < new Date()) {
      return res.status(403).json({ 
        success: false, 
        message: "Token revoked or expired" 
      })
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ 
          success: false, 
          message: "Invalid refresh token" 
        })
      }

      const access_token = generateAccessToken(
        stored.users.id, 
        stored.users.email,
        stored.users.role
      )

    //   res.cookie("access_token", access_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     maxAge: 15 * 60 * 1000
    //   })

      req.user = stored.users
      next()
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

//  CSRF protection 
export const csrfMiddleware = (req, res, next) => {
  const csrfCookie = req.cookies?.csrfToken
  const csrfHeader = req.headers["x-csrf-token"]

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ success: false, message: "CSRF token invalid" })
  }

  next()
}