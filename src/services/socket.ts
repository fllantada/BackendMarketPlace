import express from "express";
import * as http from "http";
import { Server as ioServer } from "socket.io";

type Message = {};

export class ChatSetup {
  private server: http.Server;
  private io: ioServer;

  constructor(app: express.Application) {
    this.createServer(app);
    this.connectIoToServer();
    this.handleEvents();
  }

  private createServer(app: express.Application): void {
    this.server = http.createServer(app);
  }

  private connectIoToServer(): void {
    this.io = new ioServer(this.server, {});
    this.io.listen(this.server);
  }
  private handleEvents(): void {
    this.io.on("connect", (socket: any) => {
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
  public getServer(): http.Server {
    return this.server;
  }
}
