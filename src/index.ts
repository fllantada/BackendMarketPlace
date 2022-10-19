import app from "./services/server";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor Francisco Javier Llantada funcionando en http://localhost:${PORT}  `
  );
});

server.on("error", (err) => {
  console.log("ERROR DE SERVIDOR", err);
});
