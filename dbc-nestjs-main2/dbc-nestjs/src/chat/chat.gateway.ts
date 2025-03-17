import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const CHANNEL_NAME = 'chat message';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
    this.server.emit('user status', `User connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected: ${client.id}`);
    this.server.emit('user status', `User disconnected: ${client.id}`);
  }

  @SubscribeMessage(CHANNEL_NAME)
  handleMessage(client: any, payload: string): WsResponse<string> {
    console.log(payload);
    return { event: CHANNEL_NAME, data: payload };
  }
}
