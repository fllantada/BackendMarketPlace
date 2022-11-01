import { Server as httpServer } from "http";
import { Server as ioServer } from "socket.io";
import { Socket as socketType } from "socket.io";

type Message = {
  user: string;
  message: string;
};
type user = {
  id: string;
  email: string;
};

export class SocketClass {
  private io: ioServer;
  private messages: Message[] = [];
  private users: user[] = [];

  constructor(app: httpServer) {
    this.connectIoToServer(app);
    this.handleEvents();
  }

  private connectIoToServer(app: httpServer): void {
    this.io = new ioServer(app, {});
  }
  private handleEvents(): void {
    this.io.on("connection", (socket: socketType) => {
      console.log("Connected client", socket.id);

      socket.on("message", (m: Message) => {
        console.log("New Message", m);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
      socket.on("login", (data) => {
        console.log(data);
        this.users.push({ id: socket.id, email: data });
        socket.emit("loggedUser", data);
        socket.emit("newMessage", [
          {
            user: "Admin",
            message: "Bienvenido al chat",
          },
        ]);
      });

      socket.on("chatMessage", (data: string) => {
        console.log(data);
        //esto da undefined undefined
        const message = this.createMessage(socket.id, data);

        this.messages.push(message);

        this.io.emit("newMessage", this.messages);
      });
    });
  }
  createMessage(socketId: string, data: string): Message {
    const user = this.users.find((user) => user.id === socketId);
    if (user) {
      return {
        user: user?.email,
        message: data,
      };
    } else {
      return {
        user: "Anonimo",
        message: data,
      };
    }
  }

  public getIo(): ioServer {
    return this.io;
  }
}
