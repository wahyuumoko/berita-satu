// src/app/signin/page.tsx
"use client";

import { useState } from "react";
import Axios  from "axios";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        router.push('/createPost');
      }
    } catch (error) {
      console.error('Login failed:', error);
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
            value={email} 
            onChange={(e) => setEmail(e.target.value)} required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
           type="password" 
           value={password} 
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

export default Login;
