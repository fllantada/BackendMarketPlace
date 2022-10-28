console.log("Desde el script js");
console.log("io es:", io);

var socket = io();
socket.connect("http://localhost:8080", { reconnect: true });

console.log("conectado");
