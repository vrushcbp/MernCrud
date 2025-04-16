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
  console.log(1234, users);
  const handleSubmit = async () => {
    if (editingId) {
      const response = await fetch(
        `http://localhost:5000/api/users/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    } else {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log(response);
        setError(response.statusText);
      } else {
        setError("");
      }
      getUsers();
    }

    setFormData({ name: "", email: "" });
    getUsers();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getUsers();
  };
  const handleUpdate = async (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user._id);
    getUsers();
  };
  return (
    <div>
      <h1>Welcome</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid #ccc",
          width: "100%",
          padding: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            margin: "0  20px",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            margin: "10px 0",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          {editingId ? "Update User" : " Add User"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid #ccc",
          width: "100%",
          padding: "20px",
        }}
      >
        <ul>
          {users.map((user) => {
            return (
              <li key={user._id} style={{ listStyle: "none", margin: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "400px",
                  }}
                >
                  <p>{user.id}</p>
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "3px",
                    }}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "3px",
                    }}
                    onClick={() => handleUpdate(user)}
                  >
                    update
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
