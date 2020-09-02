import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "ws";

@WebSocketGateway()
export class NotificationGateway {

  @WebSocketServer()
  server: Server

  @SubscribeMessage("notes")
  async handleMessage(@MessageBody() data: unknown) {
    return "Notes has been updated";
  }

}