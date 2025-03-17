import { Schema } from 'mongoose';
import { User } from 'src/ads/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

const UserSchema: Schema = new Schema<User>(
  {
    _id: { default: (): string => uuidv4(), required: true, type: String },
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    createdAt: { default: new Date(), required: true, type: Date },
    updatedAt: { default: undefined, type: Date },
  },
  { collection: 'users', strict: true },
);

UserSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

export default UserSchema;
