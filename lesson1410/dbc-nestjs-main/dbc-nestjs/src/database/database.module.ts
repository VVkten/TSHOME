import { Module } from '@nestjs/common';
import { MyDbProvider } from './db.provider';

@Module({
  providers: [MyDbProvider]
})
export class DatabaseModule {}
