import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
      serveRoot: '/chat',
      renderPath: '/chat',
      exclude: ['/api*', '/socket.io*'], // Exclude API and WebSocket paths
      serveStaticOptions: {
        fallthrough: true, // Allow falling through to next middleware
        index: 'index.html', // Serve index.html by default
      },
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
