'use client';

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function checkAuth() {
    try {
      const res = await axios.get(`${API}/user/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post(`${API}/user/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
  <AuthContext.Provider value={{ user, loading, setUser, logout, refreshAuth: checkAuth }}>
    {children}
  </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}