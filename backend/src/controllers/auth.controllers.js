import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getMe
} from "../services/auth.service.js"

export const register = async (req, res) => {
  try {
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
      accessToken,
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
    const oldToken = req.cookies.refreshToken

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
      accessToken: newAccessToken
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
    const token = req.cookies.refreshToken

    await logoutUser(token)

    res.clearCookie("refresh_token")

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
    const user = await getMe(req.user.id)

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