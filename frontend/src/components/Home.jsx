import React, { useEffect, useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const getUsers = () => {
    fetch("http://localhost:5000/api/users").then((res) =>
      res.json().then((data) => setUsers(data))
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError("Please fill all fields.");
      return;
    }

    const url = editingId
      ? `http://localhost:5000/api/users/${editingId}`
      : "http://localhost:5000/api/users";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      setError("Something went wrong!");
    } else {
      setError("");
      setFormData({ name: "", email: "" });
      setEditingId(null);
      getUsers();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  const handleUpdate = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user._id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management</h1>

      <div style={styles.card}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          {editingId ? "Update User" : "Add User"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <div style={styles.card}>
        <h2 style={styles.subTitle}>User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul style={{ padding: 0 }}>
            {users.map((user) => (
              <li key={user._id} style={styles.listItem}>
                <div>
                  <p style={{ margin: "4px 0", color: "black" }}>
                    <strong>{user.name}</strong>
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdate(user)}
                    style={{
                      ...styles.actionButton,
                      backgroundColor: "#f0ad4e",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{
                      ...styles.actionButton,
                      backgroundColor: "#d9534f",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
    color: "black",
  },
  subTitle: {
    marginBottom: "10px",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
  },
  actionButton: {
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    marginLeft: "8px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Home;
