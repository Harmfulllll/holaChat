import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverId = (sender) => {
  return onlineUsers[sender];
};

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log(socket.id);

  const id = socket.handshake.query.id;
  if (id !== undefined) onlineUsers[id] = socket.id;

  io.emit("onlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete onlineUsers[id];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
