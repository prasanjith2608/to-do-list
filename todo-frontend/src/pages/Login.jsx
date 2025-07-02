import { useState } from "react";

// ✅ Use environment variable for backend URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // ✅ Check status before parsing JSON
      if (!res.ok) {
        const errorText = await res.text(); // fallback if not JSON
        throw new Error(errorText || "Login failed");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      alert("✅ Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button className="bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
