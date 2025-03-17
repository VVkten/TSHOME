import { Injectable } from '@nestjs/common';
import { MyDbProvider } from 'src/database/db.provider';
import { Ad } from '../interfaces/ad.interface';

@Injectable()
export class AdPlacementService {
  constructor(private readonly dbProbider: MyDbProvider) {}

  public async createAd(Ad: Omit<Ad, '_id'>) {
    this.dbProbider.ads().create(Ad);
  }

  public async getAd(id: number) {
    return await this.dbProbider.ads().findById(id).lean();
  }

  public async getAds() {
    return await this.dbProbider.ads().find({}).lean();
  }
}
