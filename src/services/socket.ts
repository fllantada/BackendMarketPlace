import { Server as httpServer } from "http";
import { Server as ioServer } from "socket.io";
import { Socket as socketType } from "socket.io";
import moment from "moment";
import productApp from "../app/ProductApp";

type Message = {
  user: string;
  date: string;
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
      console.log("Nuevo cliente conectado!");
      socket.emit("allProducts", productApp.getAll());

      socket.on("login", (data) => {
        this.users.push({ id: socket.id, email: data });
        socket.emit("loggedUser", data);
        socket.emit("newMessage", [
          {
            user: "Admin",
            date: moment().format("DD/MM/YYYY HH:mm:ss"),
            message: "Bienvenido al chat",
          },
        ]);
      });
      socket.on("sendNewProduct", (data) => {
        console.log("Desde new product me llego data: ", data);
        productApp.create(data);
        const products = productApp.getAll();
        console.log(products);

        this.io.emit("getNewProduct", products);
      });

      socket.on("chatMessage", (data: string) => {
        console.log(data);
        const message = this.createMessage(socket.id, data);
        this.messages.push(message);
        this.io.emit("newMessage", this.messages);
      });

      socket.on("disconnect", () => {
        this.users = this.users.filter((user) => user.id !== socket.id);
      });
    });
  }
  createMessage(socketId: string, data: string): Message {
    const user = this.users.find((user) => user.id === socketId);
    if (user) {
      return {
        user: user?.email,
        date: moment().format("DD/MM/YYYY HH:mm:ss"),
        message: data,
      };
    } else {
      return {
        user: "Anonimo",
        date: moment().format("DD/MM/YYYY HH:mm:ss"),
        message: data,
      };
    }
  }

  public getIo(): ioServer {
    return this.io;
  }
}
