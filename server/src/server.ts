import app from "./app"
import http from "http"
import { Server } from "socket.io";
import chatSocket from "./socket/chatSocket";
import connectDB from "./config/db";
import dotenv from "dotenv";
dotenv.config()

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
    }
})

chatSocket(io)

const startServer = async () => {
  await connectDB();

  server.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer()