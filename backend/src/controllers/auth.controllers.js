import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getMe
} from "../services/auth.service.js"
import { otpStore, verifiedEmails } from '../store/otpStore.js' 

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // const verifiedUntil = verifiedEmails.get(email);
    // if (!verifiedUntil || Date.now() > verifiedUntil) {
    //   return res.status(403).json({ error: 'Email not verified.Please complete OTP verification.' });
    // }

    // verifiedEmails.delete(email);

    const user = await registerUser(req.body)
    
    return res.status(201).json({
      success: true,
      user
    })
    
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } =
      await loginUser(req.body)

    // Set refresh token in cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",           // set false in local dev if no HTTPS
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({
      success: true,
      access_token: accessToken,
      user
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

export const refresh = async (req, res) => {
  try {
    const oldToken = req.cookies.refresh_token

    const { newAccessToken, newRefreshToken } =
      await refreshUserToken(oldToken)

    // rotate cookie
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({
      success: true,
      access_token: newAccessToken
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refresh_token

    await logoutUser(token)

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      path: "/"
    })

    return res.json({
      success: true,
      message: "Logged out successfully"
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

export const me = async (req, res) => {
  try {
    const user = await getMe(req.user.userId);

    return res.json({
      success: true,
      user
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}