import IPersistenceRepository from "./Interfaces/IPersistenceRepository";
import { FileSaver } from "./FileSaver";
import { Product } from "./Interfaces/IProduct";

//App

class ProductApp {
  constructor(private repository: IPersistenceRepository) {}

  async getAll(): Promise<Product[]> {
    const products = this.repository.getAll();

    return products;
  }

  async getById(id: string): Promise<Product | undefined> {
    const product = (await this.repository.getById(id)) as Product;

    if (product) {
      return product;
    }
  }

  create(product: Product): Product {
    const products = this.repository.getAll();
    product.id = (products.length + 1).toString();
    product.timestamp = new Date();
    product.codigo = "codigo:" + product.id;
    this.repository.create(product);

    return product;
  }

  async edit(id: string, newProduct: Product): Promise<Product | boolean> {
    const oldProduct = await this.getById(id);
    if (!oldProduct) {
      return false;
    }

    const product: Product = {
      id: oldProduct.id,
      nombre: newProduct.nombre || oldProduct.nombre,
      foto: newProduct.foto || oldProduct.foto,
      codigo: oldProduct.codigo,
      precio: newProduct.precio || oldProduct.precio,
      stock: newProduct.stock || oldProduct.stock,
      descripcion: newProduct.descripcion || oldProduct.descripcion,
      timestamp: oldProduct.timestamp,
    };

    const savedItem = this.repository.edit(id, product) as Product | boolean;

    return savedItem;
  }

  delete(id: string): boolean {
    return this.repository.delete(id);
  }
  async addMockProducts(products: Product[]): Promise<void> {
    products.forEach((product) => {
      this.repository.create(product);
    });
  }
}

const productApi = new ProductApp(new FileSaver("products", "productFiles"));

export default productApi;
