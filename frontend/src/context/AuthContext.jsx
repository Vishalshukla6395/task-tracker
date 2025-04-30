import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await api.get("/auth/me");
          setUser({ ...response.data, token });
        } catch (err) {
          console.error("Error loading user:", err);
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const signup = async (userData) => {
    setError(null);
    try {
      const response = await api.post("/auth/signup", userData);

      localStorage.setItem("token", response.data.token);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup"
      );
      throw err;
    }
  };

  const login = async (userData) => {
    setError(null);
    try {
      const response = await api.post("/auth/login", userData);

      localStorage.setItem("token", response.data.token);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
