import React, { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "../service/profile";
function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: "",
  }); //
  useEffect(() => {
    async function loadProfile() {
      const data = await fetchUserProfile();
      if (data) {
        setProfile(data);
        setFormData({
          username: data.username,
          email: data.email,
          phoneNo: data.phoneNo,
        }); //
      }
    }
    loadProfile();
  }, []);

  //
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const success = await updateUserProfile(formData);
    if (success) {
      setProfile(formData);
      setIsEditing(false);
    }
  }; //
  if (!profile)
    return (
      <div style={{ textAlign: "center", fontSize: "1.2rem", color: "#0ff" }}>
        Loading...
      </div>
    );
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          background: "#222",
          borderRadius: "10px",
          boxShadow: "0 0 10px #fff",
        }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            textAlign: "center",
            color: "#0ff",
            textShadow: "0 0 10px #0ff, 0 0 20px #00f",
            marginBottom: "20px",
          }}
        >
          Personal Information
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {["username", "email", "phoneNo"].map((field) => (
            <div
              key={field}
              style={{ borderBottom: "1px solid #0ff", paddingBottom: "10px" }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "#bbb",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "1rem",
                    border: "1px solid #0ff",
                    borderRadius: "5px",
                    background: "#333",
                    color: "#fff",
                    
                  }}
                />
              ) : (
                <p style={{ fontSize: "1.2rem", color: "#fff" }}>
                  {profile[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {isEditing ? (
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                color: "#000",
                background: "#0ff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                color: "#000",
                background: "#0ff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
