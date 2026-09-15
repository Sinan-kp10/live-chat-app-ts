import app from "./app"
import http from "http"
import { Server } from "socket.io";

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
    }
})

io.on("connection", (socket)=>{
    console.log("User connected:", socket.id)

    socket.on("disconnect", ()=>{
        console.log("User disconnected:", socket.id)
    })
})

server.listen(5000, () => {
  console.log("Server running on port 5000");
});