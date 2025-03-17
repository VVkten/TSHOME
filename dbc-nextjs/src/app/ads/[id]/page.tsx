'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Ad } from '@/types/ad'
import { adService } from '@/services/adService'

export default function AdPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ad, setAd] = useState<Ad | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAd()
  }, [params.id])

  const loadAd = async () => {
    try {
      const data = await adService.getById(params.id)
      setAd(data)
    } catch (err) {
      setError('Failed to load ad')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this ad?')) return

    try {
      await adService.delete(params.id)
      router.push('/ads')
    } catch (err) {
      setError('Failed to delete ad')
    }
  }

  if (!ad && !error) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/ads" className="text-blue-500 hover:underline">
          ← Back to Ads
        </Link>
      </div>

      <div className="border p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{ad?.name}</h1>
        <p className="text-gray-600 mb-6">{ad?.description}</p>

        <div className="flex gap-4">
          <Link
            href={`/ads/${ad?._id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
} 