import IPersistenceRepository from "./Interfaces/IPersistenceRepository";
import { Carrito } from "./Interfaces/ICarrito";
import { FileSaver } from "./FileSaver";
import { v4 as uuidv4 } from "uuid";

class CarritoApp {
  constructor(private repository: IPersistenceRepository) {}

  create(): Carrito {
    const carrito: Carrito = {
      id: uuidv4(),
      timpestamp: new Date(),
      productos: [],
    };
    this.repository.create(carrito);
    return carrito;
  }
}
const persistenceRepository = new FileSaver("carrito", "carritoFiles");

const carritoApi = new CarritoApp(persistenceRepository);

export default carritoApi;
