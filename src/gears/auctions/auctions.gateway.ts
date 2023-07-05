import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { firstValueFrom } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@WebSocketGateway(8000, { namespace: 'auctions' })
export class AuctionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  private timeout: NodeJS.Timeout;

  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('connect');
  }

  handleDisconnect() {
    console.log('disconnect');
  }

  afterInit() {
    console.log('init');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { room: string }) {
    client.join(data.room);
    client.emit('joinedRoom', data.room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, data: { room: string }) {
    client.leave(data.room);
    client.emit('leftRoom', data.room);
  }

  @SubscribeMessage('click')
  async handleClick(client: Socket, data: { room: string; token: string }) {
    if (!(await this.server.in(data.room).fetchSockets()).find((socket) => socket.id === client.id)) return;
    if (this.timeout) clearTimeout(this.timeout);

    const clickResponse = this.gearsProxy.send('auctions.click', { id: data.room, token: data.token }).pipe(catchRpcException);
    await firstValueFrom(clickResponse);

    const auctionResponse = this.gearsProxy.send('auctions.findOne', { id: data.room, token: data.token }).pipe(catchRpcException);
    const auctionData = await firstValueFrom(auctionResponse);

    this.server.in(data.room).emit('updateData', auctionData);

    this.timeout = setTimeout(async () => {
      this.server.in(data.room).emit('auctionEnd', "L'enchère est terminée !");

      const closeResponse = this.gearsProxy
        .send('auctions.close', { id: data.room, token: data.token, basic: process.env.INTERNAL_BASIC })
        .pipe(catchRpcException);
      await firstValueFrom(closeResponse);
    }, 10000);
  }
}
