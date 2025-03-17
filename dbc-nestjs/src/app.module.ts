import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdsModule, DatabaseModule, ChatModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
