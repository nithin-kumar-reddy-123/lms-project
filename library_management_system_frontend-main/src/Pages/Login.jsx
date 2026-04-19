import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      alert("Enter credentials");
      return;
    }

    try {
      const response = await fetch("https://lms-project-3x30.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Invalid credentials");
        return;
      }

      const role = (await response.text()).trim();
      console.log("Role:", role);

      // Update AuthContext with user data from backend
      login({
        email: email,
        role: role
      });

      // Clear form inputs
      emailRef.current.value = "";
      passwordRef.current.value = "";

      // Navigate based on role
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "STUDENT") navigate("/student/dashboard");
      else if (role === "FACULTY") navigate("/faculty/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">📚</div>
          <h1>Library Portal</h1>
        </div>

        <div className="auth-tabs">
          <Link to="/login" className="auth-tab active">Login</Link>
          <Link to="/register" className="auth-tab">Register</Link>
        </div>

        <div className="form">

          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            autoComplete="off"
          />

          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="new-password"
          />

          <button onClick={handleSubmit}>
            Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;