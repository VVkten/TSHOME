import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

const CHANNEL_NAME = 'chat message';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verify(token);
      client.data.user = payload;
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage(CHANNEL_NAME)
  handleMessage(client: Socket, payload: string): void {
    const username = client.data.user.username;
    this.server.emit(CHANNEL_NAME, `${username}: ${payload}`);
  }
}
