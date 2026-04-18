import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Match backend fields
    const userData = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.text();

      alert(result);

      if (result.includes("successful")) {
        navigate("/login");
      }

    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📘</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Register as student or faculty</p>
        </div>

        <div className="auth-tabs">
          <Link
            to="/login"
            className={`auth-tab ${location.pathname === "/login" ? "active" : ""}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`auth-tab ${location.pathname === "/register" ? "active" : ""}`}
          >
            Register
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form">

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select-input"
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-submit">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;