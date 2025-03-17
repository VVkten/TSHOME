'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { adService } from '@/services/adService'
import AdForm from '../../_components/AdForm'
import { CreateAdInput, Ad } from '@/types/ad'

export default function EditAdPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ad, setAd] = useState<Ad | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (data: CreateAdInput) => {
    try {
      setIsLoading(true)
      await adService.update(params.id, data)
      router.push('/ads')
    } catch (err) {
      setError('Failed to update ad')
    } finally {
      setIsLoading(false)
    }
  }

  if (!ad && !error) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Ad</h1>
      <AdForm 
        initialData={ad || undefined}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
} 