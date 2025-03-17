import { Schema } from 'mongoose';
import { Ad } from 'src/ads/interfaces/ad.interface';
import { v4 as uuidv4 } from 'uuid';

const AdSchema: Schema = new Schema<Ad>(
  {
    _id: { default: (): string => uuidv4(), required: true, type: String },
    name: { required: true, type: String },
    description: { required: true, type: String },
    createdAt: { default: new Date(), required: false, type: Date },
    updatedAt: { default: undefined, required: false, type: Date },
  },
  { collection: 'ads', strict: true }
);

export default AdSchema;
