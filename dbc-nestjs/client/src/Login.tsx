import { useState } from 'react'


function Login({ setToken }: { setToken: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
     let response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      localStorage.setItem('token', result.access_token);
      setToken(result.access_token);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          autoComplete="off"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          type="password"
          autoComplete="off"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
