import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";   // ✅ correct import

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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await API.post("/auth/register", userData);  // ✅ axios

      alert(response.data);

      if (response.data.includes("successful")) {
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
        </div>

        <div className="auth-tabs">
          <Link to="/login" className={`auth-tab ${location.pathname === "/login" ? "active" : ""}`}>
            Login
          </Link>
          <Link to="/register" className={`auth-tab ${location.pathname === "/register" ? "active" : ""}`}>
            Register
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form">

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
          </select>

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;