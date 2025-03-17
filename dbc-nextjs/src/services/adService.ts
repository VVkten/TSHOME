import { Ad, CreateAdInput, UpdateAdInput } from '@/types/ad';

const API_URL_ADS = 'http://localhost:3001/ads';

export const adService = {
  // Get all ads
  async getAll(): Promise<Ad[]> {
    const response = await fetch(API_URL_ADS);
    if (!response.ok) throw new Error('Failed to fetch ads');
    return (await response.json()).items;
  },

  // Get single ad
  async getById(id: string): Promise<Ad> {
    const response = await fetch(`${API_URL_ADS}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch ad');
    return response.json();
  },

  // Create new ad
  async create(ad: CreateAdInput): Promise<Ad> {
    const response = await fetch(API_URL_ADS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ad),
    });
    if (!response.ok) throw new Error('Failed to create ad');
    return response.json();
  },

  // Update ad
  async update(id: string, ad: UpdateAdInput): Promise<Ad> {
    const response = await fetch(`${API_URL_ADS}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ad),
    });
    if (!response.ok) throw new Error('Failed to update ad');
    return response.json();
  },

  // Delete ad
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL_ADS}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete ad');
  },
}; 