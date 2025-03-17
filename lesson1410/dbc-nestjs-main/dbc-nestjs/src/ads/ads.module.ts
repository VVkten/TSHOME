import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdPlacementService } from './services/ad-placement.service';
import { DatabaseModule } from 'src/database/database.module';
import { MyDbProvider } from 'src/database/db.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AdsController],
  providers: [AdPlacementService, MyDbProvider]
})
export class AdsModule {}
