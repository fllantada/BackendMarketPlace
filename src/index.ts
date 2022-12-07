import { SocketClass } from "./services/socket";
import server from "./services/server";
import MongoSaver from "./app/percistence/MongoSaver";

const PORT = process.env.PORT || 8080;
new SocketClass(server, new MongoSaver("messages"));

server.listen(PORT, () => {
  console.log(
    `Servidor Francisco Javier Llantada funcionando en http://localhost:${PORT}  `
  );
});

server.on("error", (err) => {
  console.log("ERROR DE SERVIDOR", err);
});
