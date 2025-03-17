'use client' // This directive marks this as a Client Component

import { useState, useEffect } from 'react'

export default function ClientPage() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    // This will only run in the browser
    setCurrentTime(new Date().toLocaleString())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Client-side Rendered Page</h1>
      <p className="mb-4">This page is rendered on the client with interactive elements.</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p>Current time (updates every second): {currentTime}</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="mb-2">Interactive counter: {clickCount}</p>
          <button 
            onClick={() => setClickCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  )
} 