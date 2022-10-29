import { Server as httpServer } from "http";
import { Server as ioServer } from "socket.io";

type Message = {};

export class Socket {
  private io: ioServer;

  constructor(app: httpServer) {
    this.connectIoToServer(app);
    this.handleEvents();
  }

  private connectIoToServer(app: httpServer): void {
    this.io = new ioServer(app, {});
  }
  private handleEvents(): void {
    this.io.on("connection", (socket: any) => {
      console.log("Connected client", socket.id);

      socket.on("message", (m: Message) => {
        console.log("New Message", m);
      });
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  public getIo(): ioServer {
    return this.io;
  }
}
