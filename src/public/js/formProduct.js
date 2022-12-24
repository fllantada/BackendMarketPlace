console.log("Ejecutando formProduct");

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: e.target.titulo.value,
    price: e.target.precio.value,
    thumbnail: e.target.thumbnail.value,
  };

  //logica del post de producto
  console.log(product);
});
