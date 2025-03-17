import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (username && password) {
        
        // socket.emit('chat message', inputValue)
        // setInputValue('')
      }
    }
  
    return (
      <div className="chat-container">
        <form className="chat-form" onSubmit={handleSubmit}>
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
            autoComplete="off"
            />
          <button type="submit">Login</button>
        </form>
      </div>
    )
}

export default Login