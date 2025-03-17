'use client'

import { useState, FormEvent } from 'react'
import { CreateAdInput, Ad } from '@/types/ad'

interface AdFormProps {
  initialData?: Ad
  onSubmit: (data: CreateAdInput) => Promise<void>
  isLoading?: boolean
}

export default function AdForm({ initialData, onSubmit, isLoading }: AdFormProps) {
  const [formData, setFormData] = useState<CreateAdInput>({
    name: initialData?.name || '',
    description: initialData?.description || '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
} 