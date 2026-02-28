const { Server } = require("socket.io");
const { env } = require("./utils/env");

let io;

function attachSockets(server) {
  io = new Server(server, {
    cors: {
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("room:join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = { attachSockets, getIO: () => io };