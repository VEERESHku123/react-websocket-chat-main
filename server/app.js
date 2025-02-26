
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("start connection ");
  const clientAddress = socket.handshake.address;
  const clientId = socket.id;
  console.log(`Client connected: ID=${clientId}, IP=${clientAddress}`);

  socket.on("enter", (name) => {
    users[clientId] = name;
    io.emit("updateUserList", Object.values(users)); 
  });

 
  socket.on("send", (payload) => {
    console.log(payload);
    socket.broadcast.emit("broadcast", payload);
  });

  
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ID=${clientId}, IP=${clientAddress}`);
    delete users[clientId];
    io.emit("updateUserList", Object.values(users)); 
  });
});


server.listen(3001, () => {
  console.log("Listening..");
});
