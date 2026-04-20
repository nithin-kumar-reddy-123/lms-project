import React, { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("lms_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = (name, email, password, role) => {
    const existingUsers =
      JSON.parse(localStorage.getItem("lms_registered_users")) || [];

    const normalizedEmail = email.trim().toLowerCase();

    const alreadyExists = existingUsers.find(
      (u) => u.email.trim().toLowerCase() === normalizedEmail
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    const newUser = {
      name,
      email: normalizedEmail,
      password,
      role,
    };

    existingUsers.push(newUser);

    localStorage.setItem("lms_registered_users", JSON.stringify(existingUsers));

    return { success: true };
  };

  const login = (userData) => {
    // userData = { email, role } from backend
    setUser(userData);
    localStorage.setItem("lms_user", JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
    localStorage.removeItem("authToken");
  };

  const value = useMemo(() => {
    return { user, register, login, logout };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}