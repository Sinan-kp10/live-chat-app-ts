import { Server, Socket } from "socket.io";
import { createMessageController, getMessagesController } from "../controller/messageController";

const chatSocket = (io : Server)=>{

    io.on("connection", (socket : Socket)=>{
        console.log("User connected:", socket.id);

        socket.on("join", (username, string)=>{
            console.log(`${username} joined the chat`);
            socket.data.username = username
        })

        socket.on("getMessages", async () => {
            try {
                const messages = await getMessagesController();

                socket.emit("messageHistory", messages);
            } catch (error) {
                console.error("Failed to get messages:", error);
            }
        });

        socket.on("sendMessage", async (data)=>{
            try {
                const savedMessage = await createMessageController(data.username, data.message)
                io.emit("receiveMessage", savedMessage)
                
            } catch (error) {
                console.error("Message saving failed:", error);
                
            }
        })

        socket.on("disconnect", ()=>{
            console.log("User disconnected:", socket.id);
        })
    })

}
export default chatSocket