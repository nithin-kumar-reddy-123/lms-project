import React, { useState, useEffect } from "react";
import API from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordChange, setPasswordChange] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/create-admin", {
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        password: newAdmin.password
      });

      alert(response.data);
      if (response.data.includes("successfully")) {
        setNewAdmin({ fullName: "", email: "", password: "", confirmPassword: "" });
        setShowCreateAdmin(false);
        fetchUsers(); // Refresh user list
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Error creating admin account");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/change-password", {
        email: passwordChange.email,
        currentPassword: passwordChange.currentPassword,
        newPassword: passwordChange.newPassword
      });

      alert(response.data);
      if (response.data.includes("successfully")) {
        setPasswordChange({
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setShowChangePassword(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="page">
      <h2 className="page-title">👥 User Management</h2>

      <div className="admin-actions" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setShowCreateAdmin(true)} className="btn-primary">
          ➕ Create New Admin
        </button>
        <button onClick={() => setShowChangePassword(true)} className="btn-secondary">
          🔑 Change Password
        </button>
      </div>

      {/* Create Admin Modal */}
      {showCreateAdmin && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="modal" style={{
            background: 'white', padding: '20px', borderRadius: '8px',
            width: '400px', maxWidth: '90%'
          }}>
            <h3>Create New Admin Account</h3>
            <form onSubmit={handleCreateAdmin}>
              <input
                type="text"
                placeholder="Full Name"
                value={newAdmin.fullName}
                onChange={(e) => setNewAdmin({...newAdmin, fullName: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={newAdmin.confirmPassword}
                onChange={(e) => setNewAdmin({...newAdmin, confirmPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Create Admin</button>
                <button type="button" onClick={() => setShowCreateAdmin(false)} className="btn-secondary" style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="modal" style={{
            background: 'white', padding: '20px', borderRadius: '8px',
            width: '400px', maxWidth: '90%'
          }}>
            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <input
                type="email"
                placeholder="Your Email"
                value={passwordChange.email}
                onChange={(e) => setPasswordChange({...passwordChange, email: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="password"
                placeholder="Current Password"
                value={passwordChange.currentPassword}
                onChange={(e) => setPasswordChange({...passwordChange, currentPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordChange.newPassword}
                onChange={(e) => setPasswordChange({...passwordChange, newPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordChange.confirmPassword}
                onChange={(e) => setPasswordChange({...passwordChange, confirmPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Change Password</button>
                <button type="button" onClick={() => setShowChangePassword(false)} className="btn-secondary" style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table" style={{ marginTop: '20px' }}>
        <h3>All Users ({users.length})</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Full Name</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.id}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.fullName}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.email}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <span className={`role-badge role-${user.role.toLowerCase()}`} style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: user.role === 'ADMIN' ? '#dc3545' : user.role === 'FACULTY' ? '#ffc107' : '#28a745',
                      color: 'white'
                    }}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;