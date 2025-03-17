import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      serveRoot: '/chat',
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
