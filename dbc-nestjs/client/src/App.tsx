import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import Login from './Login'

let socket = io(localStorage.getItem('token') ? {
  extraHeaders: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
} : {});

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '');

useEffect(() => {
    if (!token) {
      socket.disconnect();
      return;
    }

    socket = io({
      extraHeaders: {
        "Authorization": `Bearer ${token}`
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      if (error.message === 'Unauthorized') {
        setToken('');
        localStorage.removeItem('token');
      }
    });

    socket.on('chat message', (msg: string) => {
      console.log('message received', msg);
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('chat message');
      socket.disconnect();
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue) {
      socket.emit('chat message', inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="chat-container">
      { !token && <Login setToken={setToken} /> }
      <ul className="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
