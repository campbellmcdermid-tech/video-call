const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", socket => {
  socket.on("join-room", room => {
    socket.join(room);
    socket.room = room;
  });

  socket.on("offer", data => {
    socket.to(socket.room).emit("offer", data);
  });

  socket.on("answer", data => {
    socket.to(socket.room).emit("answer", data);
  });

  socket.on("candidate", data => {
    socket.to(socket.room).emit("candidate", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running"));
