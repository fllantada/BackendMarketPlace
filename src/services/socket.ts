import { Server as httpServer } from "http";
import { Server as ioServer } from "socket.io";
import { Socket as socketType } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { denormalize, normalize, schema } from "normalizr";
import IPersistenceRepository from "../app/Interfaces/IPersistenceRepository";
import moment from "moment";
import productApp from "../app/ProductApp";

type Message = {
  id: string;
  author: Author;
  text: string;
  date: string;
};

type Author = {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  edad: number;
  alias: string;
  avatar: string;
};

const author = new schema.Entity("authors", {});

const message = new schema.Entity("messages", { author });

const finalSchema = new schema.Array(message);

export class SocketClass {
  private io: ioServer;
  private messages: Message[] = [];
  private authors: Author[] = [];

  constructor(
    app: httpServer,
    private persistenceRepository: IPersistenceRepository
  ) {
    this.connectIoToServer(app);
    this.handleEvents();
  }

  private connectIoToServer(app: httpServer): void {
    this.io = new ioServer(app, {});
  }

  private handleEvents(): void {
    this.io.on("connection", (socket: socketType) => {
      socket.on("login", (data) => {
        const author = this.createAuthor(data);

        this.authors.push(author);
        socket.emit("loggedUser", data);
        socket.emit("newMessage", [
          {
            user: "Admin",
            date: moment().format("DD/MM/YYYY HH:mm:ss"),
            message: "Bienvenido al chat",
          },
        ]);
        this.getAllNormalized().then((data) => {
          socket.emit("allMessages", data);
        });
      });
      socket.on("sendNewProduct", (data) => {
        productApp.create(data);
        const products = productApp.getAll();
        console.log(products);

        this.io.emit("getNewProduct", products);
      });

      socket.on("chatMessage", (data: string) => {
        const message = this.createMessage(socket.id, data);
        if (!message) return;
        this.messages.push(message);
        this.persistenceRepository.create(message);
        this.io.emit("newMessage", this.messages);
      });

      socket.on("disconnect", () => {
        this.authors = this.authors.filter((user) => user.id !== socket.id);
      });
    });
  }

  createAuthor(data: any): Author {
    return {
      id: uuidv4(),
      email: data.email,
      nombre: data?.nombre,
      apellido: data?.apellido,
      edad: data?.edad,
      alias: data?.alias,
      avatar: data?.avatar,
    };
  }

  createMessage(socketId: string, data: string): Message | undefined {
    const user: Author | undefined = this.authors.find(
      (user) => user.id === socketId
    );

    if (user) {
      return {
        author: user,
        id: uuidv4(),
        text: data,
        date: moment().format("DD/MM/YYYY HH:mm:ss"),
      };
    }
  }
  async getAllNormalized() {
    const data = await this.persistenceRepository.getAll();
    return normalize(data, finalSchema);
  }

  async getAllDenormalized() {
    const data = await this.getAllNormalized();
    return denormalize(data.result, finalSchema, data.entities);
  }

  public getIo(): ioServer {
    return this.io;
  }
}
