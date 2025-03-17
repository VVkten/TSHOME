// Server Component by default
export default function ServerPage() {
  // This will be executed on the server
  const serverTimeStamp = new Date().toLocaleString()
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Server-side Rendered Page</h1>
      <p className="mb-4">This page is rendered on the server.</p>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p>Server timestamp (static): {serverTimeStamp}</p>
      </div>
    </div>
  )
} 