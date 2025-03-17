import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import UserSchema from './schemas/user.schema';
import { User } from 'src/ads/interfaces/user.interface';
import AdSchema from './schemas/ad.schema';
import { Ad } from 'src/ads/interfaces/ad.interface';

@Injectable()
export class MyDbProvider {
  private readonly userModel!: Model<User>;
  private readonly adModel!: Model<Ad>;

  public constructor() {
    const connection = mongoose.createConnection(process.env.DATABASE_URL!, { dbName: 'denysiak'});
    this.userModel = connection.model<User>('User', UserSchema);
    this.adModel = connection.model<Ad>('Ad', AdSchema);
  }

  public ads(): Model<Ad> {
    return this.adModel;
  }

  public users(): Model<User> {
    return this.userModel;
  }
}