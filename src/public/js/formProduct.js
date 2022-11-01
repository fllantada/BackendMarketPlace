const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: e.target.titulo.value,
    price: e.target.precio.value,
    thumbnail: e.target.thumbnail.value,
  };
  console.log(product);
  socket.emit("sendNewProduct", product);
});

socket.on("getNewProduct", (data) => {
  console.log("DESDE Get PRODUCTS");
  console.log(data);
  if (data.length) outputProduct(data[data.length - 1]);
});

socket.on("allProducts", (data) => {
  console.log("DESDE ALL PRODUCTS");
  console.log(data);

  data.forEach((product) => {
    outputProduct(product);
  });
});

function outputProduct(product) {
  console.log("DESDE OUTPUT me llego un producto", product);
  const filas = document.getElementById("tbody");

  const div = document.createElement("tr");
  div.classList.add("fila");
  div.innerHTML = `<td>${product.id}</td><td>${product.title}</td>
    <td>${product.price}</td>
    <td><img src="${product.thumbnail}" alt="imagen producto" width="50px"></td>
    `;
  filas.appendChild(div);
}
