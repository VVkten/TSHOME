'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adService } from '@/services/adService'
import AdForm from '../_components/AdForm'
import { CreateAdInput } from '@/types/ad'

export default function NewAdPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: CreateAdInput) => {
    try {
      setIsLoading(true)
      await adService.create(data)
      router.push('/ads')
    } catch (err) {
      setError('Failed to create ad')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Ad</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AdForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
} 