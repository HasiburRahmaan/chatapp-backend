import app from "./app";
import { Server } from "socket.io";
import http from "http";

const expressServer = http.createServer(app);

const io = new Server(expressServer, {
  pingTimeout: 60000, // 60 seconds berfore disconnect
  cors: {
    origin: "*",
    // origin:  ["http://localhost:3000"],
  },
});

function socketStart() {
  try {
    io.on("connection", (socket) => {
      //   console.log("New client connected");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected to chat");
      });

      socket.on("join_chat", (chatId) => {
        socket.join(chatId);
        socket.emit("connected to group-chat");
      });

      socket.on("new_message", (message) => {
        let chat = message?.chat;
        message?.chat?.users?.forEach((userId: any) => {
          if (userId == message.sender._id.toString()) return;
          socket.in(chat?._id).emit("message_received", message);
        });
      });

      socket.on("typing_started", (chatId) => {
        socket.in(chatId).emit("typing_started", chatId);
      });
      socket.on("typing_stopped", (chatId) => {
        socket.in(chatId).emit("typing_stopped", chatId);
      });

      // socket.off("setup", () => {
      //   // console.log("Client disconnected");
      //   socket.leave(userData._id);
      // });
    });
  } catch (error) {
    console.log("=========>", error);
  }
}

socketStart();

export { io, expressServer };
