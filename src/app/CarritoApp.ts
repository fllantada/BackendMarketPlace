import IPersistenceRepository from "./Interfaces/IPersistenceRepository";
import { Carrito } from "./Interfaces/ICarrito";
import { FileSaver } from "./FileSaver";
import { v4 as uuidv4 } from "uuid";
import productApi from "./ProductApp";
import { Product } from "./Interfaces/IProduct";

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
  delete(id: string): { deleted: boolean } {
    const deleted = this.repository.delete(id);
    return { deleted };
  }
  async addProduct(
    id_carrito: string,
    id_producto: string
  ): Promise<Carrito | { Error: string }> {
    const carrito = (await this.repository.getById(id_carrito)) as Carrito;

    if (carrito) {
      const product = await productApi.getById(id_producto);

      if (product) {
        carrito.productos.push(product);
        this.repository.edit(id_carrito, carrito);
        return carrito;
      } else {
        return { Error: "Producto no encontrado" };
      }
    } else {
      return { Error: "Carrito no encontrado" };
    }
  }
  async removeProduct(
    id_carrito: string,
    id_producto: string
  ): Promise<Carrito | { Error: string }> {
    const carrito = (await this.repository.getById(id_carrito)) as Carrito;

    if (carrito) {
      const product = await productApi.getById(id_producto);

      if (product) {
        carrito.productos = carrito.productos.filter(
          (p) => p.id !== product.id
        );
        this.repository.edit(id_carrito, carrito);
        return carrito;
      } else {
        return { Error: "Producto no encontrado" };
      }
    } else {
      return { Error: "Carrito no encontrado" };
    }
  }
  async getProducts(id_carrito: string): Promise<Product[]> {
    const carrito = (await this.repository.getById(id_carrito)) as Carrito;

    if (carrito) {
      return carrito.productos;
    } else {
      return [];
    }
  }
  async getAll(): Promise<Carrito[]> {
    const carritos = await this.repository.getAll();
    return carritos;
  }
}

const persistenceRepository: IPersistenceRepository = new FileSaver(
  "carrito",
  "carritoFiles"
);

const carritoApi = new CarritoApp(persistenceRepository);

export default carritoApi;
