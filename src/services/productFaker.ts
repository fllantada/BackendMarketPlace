import { faker } from "@faker-js/faker";
import { Product } from "../app/Interfaces/IProduct";

export default function productsFaker(n: number): Product[] | any {
  let products: Product[] = [];

  for (let i = 0; i < n; i++) {
    products.push({
      nombre: faker.commerce.productName(),
      foto: faker.image.cats(),
      precio: faker.datatype.number({ max: 10000 }),
      stock: faker.datatype.number({ max: 100 }),
      descripcion: faker.lorem.paragraph(),
    });
  }
  return products;
}
