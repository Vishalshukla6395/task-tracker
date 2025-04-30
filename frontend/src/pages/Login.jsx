import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      await login(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthForm
      title="Welcome back"
      buttonText="Log In"
      onSubmit={handleSubmit}
      isLogin={true}
      error={error}
      setError={setError}
    />
  );
};

export default Login;
