import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

interface Message {
    _id: string;
    username: string;
    message: string;
    createdAt: string;
}

interface ChatPageProps {
    username: string;
}

function ChatPage({ username }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const handleMessageHistory = (messages: Message[]) => {
            setMessages(messages);
        };

        const handleReceiveMessage = (newMessage: Message) => {
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on("messageHistory", handleMessageHistory);

        socket.on("receiveMessage", handleReceiveMessage);

        socket.emit("getMessages");

        return () => {
            socket.off("messageHistory", handleMessageHistory);
            socket.off("receiveMessage", handleReceiveMessage);
        }

    }, [])

    return (
        <div>
        <h1>Live Chat</h1>

        <h3>Welcome, {username} 👋</h3>

        <MessageList messages={messages} username={username}/>

        <MessageInput username={username} />
        </div>
    );
}

export default ChatPage;