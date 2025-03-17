import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const CHANNEL_NAME = 'chat message';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(CHANNEL_NAME)
  handleMessage(client: any, payload: string): void {
    this.server.emit(CHANNEL_NAME, payload);
  }
}
