import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LabelWithInput({ id, labelText, inputType, value, onChange }: { id: string; labelText: string; inputType: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "2px" }}>{labelText}</label>
      <input id={id} type={inputType} value={value} onChange={onChange} style={{ padding: "2px", width: "100%" }} />
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://dogs.kobernyk.com/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginUser(username, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      <LabelWithInput id="username" labelText="Username" inputType="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <LabelWithInput
        id="password"
        labelText="Password"
        inputType="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
