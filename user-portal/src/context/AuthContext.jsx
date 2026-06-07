import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, clearToken } from '../api/tokens.js';

const AuthContext = createContext();

let refreshPromise = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (!refreshPromise) {
        refreshPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        }).then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Session refresh failed');
        }).catch((err) => {
          refreshPromise = null; // reset on error so retries can occur later if needed
          throw err;
        });
      }

      try {
        const data = await refreshPromise;
        setToken(data.access_token);  // ✅ stores in memory

        // ✅ fetch user with the restored token
        const meRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
          credentials: 'include',
        });
        const meData = await meRes.json();
        if (meData.success) setUser(meData.user);
      } catch (err) {
        console.error('Session restore failed:', err);
      } finally {
        setLoading(false);  // ✅ only renders children after this
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password, type, redirectTo) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, type }),
    });

    const data = await res.json();

    if (data.success) {
      refreshPromise = null; // reset lock on login
      setToken(data.access_token);
      setUser(data.user); // backend should return user object
      navigate(redirectTo || '/events');
      return null; // no error
    }

    // Redirect to OTP page if account is not verified
    if (res.status === 403 || data.message?.toLowerCase().includes('not verified') || data.message?.toLowerCase().includes('otp') || data.error?.toLowerCase().includes('not verified')) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error('Failed to trigger OTP send:', err);
      }
      navigate('/otp', { state: { email, password, fromLogin: true, from: redirectTo } });
      return 'Email not verified. Redirecting to OTP verification...';
    }

    return data.message || data.error || 'Login failed'; // return error string
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      refreshPromise = null; // reset lock on logout
      clearToken();
      setUser(null);
      navigate('/login');
    }
  };

  const register = async (name, email, password, redirectTo) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, role: 'student' }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      // If registration succeeds (meaning OTP is already verified), auto-login the user!
      const loginErr = await login(email, password, undefined, redirectTo);
      if (!loginErr) {
        navigate(redirectTo || '/events');
        return null;
      }
    }

    // If unverified, trigger OTP send and redirect
    if (res.status === 403 || data.error?.toLowerCase().includes('not verified') || data.message?.toLowerCase().includes('not verified')) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error('Failed to trigger OTP send during register:', err);
      }
      navigate('/otp', { state: { name, email, password, fromRegister: true, from: redirectTo } });
      return null;
    }

    return data.message || data.error || 'Registration failed';
  };
  const loginWithToken = async (accessToken) => {
    setToken(accessToken);
    try {
      const meRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });
      const meData = await meRes.json();
      if (meData.success) {
        setUser(meData.user);
        return meData.user;
      }
    } catch (err) {
      console.error('Failed to login with token:', err);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register, loginWithToken, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);