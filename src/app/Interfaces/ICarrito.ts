import { Product } from "./IProduct";

export interface Carrito {
  id: string;
  timpestamp: Date;
  productos: Product[];
}
