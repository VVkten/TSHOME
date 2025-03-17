'use client'

import { useState, useEffect } from 'react'
import { Ad } from '@/types/ad'
import { adService } from '@/services/adService'
import Link from 'next/link'

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAds()
  }, [])

  const loadAds = async () => {
    try {
      const data = await adService.getAll()
      setAds(data)
    } catch (err) {
      setError('Failed to load ads')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ad?')) return

    try {
      await adService.delete(id)
      setAds(ads.filter(ad => ad._id !== id))
    } catch (err) {
      setError('Failed to delete ad')
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ads</h1>
        <Link 
          href="/ads/new" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Ad
        </Link>
      </div>

      <div className="grid gap-4">
        {ads.map(ad => (
          <div key={ad._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{ad.name}</h2>
            <p className="text-gray-600 mt-2">{ad.description}</p>
            <div className="mt-4 flex gap-2">
              <Link 
                href={`/ads/${ad._id}`}
                className="text-blue-500 hover:underline"
              >
                View
              </Link>
              <Link 
                href={`/ads/${ad._id}/edit`}
                className="text-green-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(ad._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 