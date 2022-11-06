import IPersistenceRepository from "./IPersistenceRepository";
import { FileSaver } from "./FileSaver";
import { Product } from "./IProduct";

//Value Object

//test product for check

const testProducts: Product[] = [
  {
    id: "1",
    title: "test",
    price: 100,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/social-media-2189/48/22-Yahoo-512.png",
  },
  {
    id: "2",
    title: "test",
    price: 100,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/social-media-2189/48/22-Yahoo-512.png",
  },
];

//App

class ProductApp {
  private repository: IPersistenceRepository;

  constructor(repository: IPersistenceRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Product[]> {
    console.log("Inicio getAll de Product APP");
    const products = await this.repository.getAll();
    console.log("products desde getAll de Product APP", products);

    //empty file

    if (!products || products.length === 0) {
      console.log("OJO INGRESE A AGREGAR MOCK PRODUCTS");
      this.addMockProducts(testProducts);
    }
    return products;
  }

  async getById(id: string): Promise<Product | undefined> {
    const product = (await this.repository.getById(id)) as Product;
    console.log("Desde product App get by id, product es", product);
    if (product) {
      return product;
    }
    console.log("Retornando undefined");
  }

  async create(product: Product): Promise<void> {
    const products = await this.repository.getAll();
    product.id = (products.length + 1).toString();
    this.repository.create(product);
  }

  async edit(id: string, newProduct: Product): Promise<Product | boolean> {
    const oldProduct = await this.getById(id);

    if (oldProduct) {
      const product: Product = {
        title: newProduct.title || oldProduct?.title,
        price: newProduct.price || oldProduct?.price,
        thumbnail: newProduct.thumbnail || oldProduct?.thumbnail,
      };

      return product;
    } else {
      return false;
    }
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
