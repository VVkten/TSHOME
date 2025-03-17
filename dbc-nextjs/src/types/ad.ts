export interface Ad {
  _id: string;
  name: string;
  description: string;
}

export type CreateAdInput = Omit<Ad, '_id'>;
export type UpdateAdInput = Partial<CreateAdInput>; 