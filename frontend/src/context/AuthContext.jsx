import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, clearToken } from '../api/tokens.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json(); // ← was missing
        setToken(data.access_token);
        setUser(data.user);
      }
    } catch (err) {
      console.error('Session restore failed:', err);
    } finally {
      setLoading(false);
    }
  };

    restoreSession();
  }, []);

  const login = async (email, password, type) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, type }),
    });

    const data = await res.json();

    if (data.success) {
      setToken(data.access_token);
      setUser(data.user); // backend should return user object
      navigate('/dashboard');
      return null; // no error
    }

    return data.message || 'Login failed'; // return error string
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
      clearToken();
      setUser(null);
      navigate('/login');
    }
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, role: 'student' }),
    });
    const data = await res.json();
    if (data.success) {
      return login(email, password);
    }
    return data.message || 'Registration failed';
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);