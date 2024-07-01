// src/app/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Login successful:", data);
      router.push("/createPost"); // Redirect to profile page after login
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">USER LOGIN</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-column">
          <a href="#">Lupa Password</a>
          <a href="/signup">Belum Punya akun?</a>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
