//Socket Conection
const socket = io();
console.log("Ejecutando chat.js");
socket.connect("http://localhost:8080", { reconnect: true });
socket.on("connection", function () {
  console.log("conectado");
});
//get DOM elements
const loginInputForm = document.getElementById("login");
const mail = document.getElementById("mail");

const chatInputForm = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container-id");

const messagesContainer = document.querySelector(".chat-messages");
const msg = document.getElementById("msg");

chatContainer.classList.add("hidden");

//login

//get userDAta from cookie
let userData = {};

if (document.cookie && false) {
  console.log(document.cookie);
  const cookie = document.cookie.split("=");
  userData.email = cookie[1];
  socket.emit("login", userData.email);
} else
  userData.email = `franciscollantada@gmail.com${Math.random(2).toString()}`;

socket.emit("login", userData.email);

//logged in User
socket.on("loggedUser", (data) => {
  chatContainer.classList.remove("hidden");
  loginInputForm.classList.add("hidden");
});

//New Message
socket.on("newMessage", (data) => {
  console.log("NEw message", data);
  outputMessage(data[data.length - 1]);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  window.scrollTo(0, document.body.scrollHeight);
});

//Message submit
chatInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msg.value;

  socket.emit("chatMessage", message);
  msg.value = "";
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
  <p class="email-usuario">${message.user} <span class="fecha-mensaje"> [ ${message.date} ]</span></p>
  <p class="texto-mensaje"> ${message.message} </p>`;

  messagesContainer.appendChild(div);
}

//Get Room's Info
socket.on("roomUsers", (roomInfo) => {
  const { room, users } = roomInfo;

  outputRoomName(room);
  outputUsers(users);
});

//add Room Name
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  const arrayofUsers = users.map((aUser) => `<li>${aUser.username}</li>`);

  usersList.innerHTML = arrayofUsers.join("");
}
