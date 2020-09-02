import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "ws";

@WebSocketGateway(81)
export class NotificationGateway {

  @WebSocketServer()
  server: Server

  @SubscribeMessage("notes")
  async handleMessage(@MessageBody() data: unknown) {
    console.log(data);
    return "Notes has been updated";
  }

}