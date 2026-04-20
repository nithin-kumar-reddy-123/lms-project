import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";

function Profile() {
  const { user, login } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await API.put("/auth/update-profile", profile);
      alert(response.data);
      // Update context
      login({ ...user, fullName: profile.fullName, email: profile.email });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  if (!user) return <div>Please login</div>;

  return (
    <div className="page">
      <div className="form-card">
        <h2 className="page-title">My Profile</h2>

        <div className="form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;