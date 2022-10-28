import { ChatSetup } from "./services/socket";
import app from "./services/server";

const PORT = process.env.PORT || 8080;
const chatSetup = new ChatSetup(app);
const server = chatSetup.getServer();
const io = chatSetup.getIo();

server.listen(PORT, () => {
  console.log(
    `Servidor Francisco Javier Llantada funcionando en http://localhost:${PORT}  `
  );
});

server.on("error", (err) => {
  console.log("ERROR DE SERVIDOR", err);
});
