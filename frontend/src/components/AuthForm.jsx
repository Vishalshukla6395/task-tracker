import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  isLogin = false,
  error,
  setError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && !name) {
      setError("Name is required");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    const userData = isLogin ? { email, password } : { name, email, password };

    onSubmit(userData);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h1 className="auth-form-title">{title}</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {buttonText}
          </button>
        </form>

        <div className="auth-form-footer">
          {isLogin ? (
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
