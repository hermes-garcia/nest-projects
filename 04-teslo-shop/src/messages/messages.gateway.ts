import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesService.registerClient(client, payload.id);
    } catch (e) {
      client.disconnect();
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //only to client
    /*client.emit('message-from-server', {
      fullName: 'me',
      message: payload.message || 'no-message!',
    });*/

    //emit everyone except client
    /*client.broadcast.emit('message-from-server', {
      fullName: 'me',
      message: payload.message || 'no-message!',
    });*/

    //emit everyone
    this.wss.emit('message-from-server', {
      fullName: this.messagesService.getFullNameBySocketId(client.id),
      message: payload.message || 'no-message!',
    });
  }
}
