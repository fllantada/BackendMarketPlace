import { SocketClass } from "./services/socket";
import server from "./services/server";

const PORT = process.env.PORT || 8080;
new SocketClass(server);

server.listen(PORT, () => {
  console.log(
    `Servidor Francisco Javier Llantada funcionando en http://localhost:${PORT}  `
  );
});

server.on("error", (err) => {
  console.log("ERROR DE SERVIDOR", err);
});
