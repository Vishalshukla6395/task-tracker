import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      await signup(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      error={error}
      setError={setError}
    />
  );
};

export default Signup;
