import productsFaker from "./productFaker";

const propertyes = ["nombre", "foto", "precio", "stock", "description"];

describe("productsFaker", () => {
  it("should return the correct amount of produts", () => {
    const products = productsFaker(5);
    expect(products).toHaveLength(5);
  });

  it("should return type Product with the correct properties", () => {
    const products = productsFaker(5);
    expect(products).toHaveLength(5);
    expect(products[0]).toHaveProperty("nombre");
    expect(products[0]).toHaveProperty("foto");
    expect(products[0]).toHaveProperty("precio");
    expect(products[0]).toHaveProperty("stock");
    expect(products[0]).toHaveProperty("descripcion");
  });
});
