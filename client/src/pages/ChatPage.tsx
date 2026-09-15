import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import type { ChatPageProps, Message, Notification } from "../type/chat";



function ChatPage({ username }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<number>(0)
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleMessageHistory = (messages: Message[]) => {
            setMessages(messages);
        };

        const handleReceiveMessage = (newMessage: Message) => {
            setMessages((prev) => [...prev, newMessage]);
        };

        const handleOnlineUsers = (count: number) => {
            setOnlineUsers(count);
        };

        const handleUserJoined = (username: string) => {
            const notification: Notification = {
                id: crypto.randomUUID(),
                type: "joined",
                username,
            };

            setNotifications((prev) => [...prev, notification])
        };

        const handleUserLeft = (username: string) => {
            const notification: Notification = {
                id: crypto.randomUUID(),
                type: "left",
                username,
            };

            setNotifications((prev) => [...prev, notification]);
        };

        socket.on("messageHistory", handleMessageHistory);
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("onlineUsers", handleOnlineUsers);
        socket.on("userJoined", handleUserJoined);
        socket.on("userLeft", handleUserLeft);

        socket.emit("getMessages");

        return () => {
            socket.off("messageHistory", handleMessageHistory);
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("onlineUsers", handleOnlineUsers);
            socket.off("userJoined", handleUserJoined);
            socket.off("userLeft", handleUserLeft);
        }

    }, [])

    return (
        <div>
        <h1>Live Chat</h1>
        <p>🟢 {onlineUsers} people online</p>

        <h3>Welcome, {username} 👋</h3>

        {notifications.map((notification) => (
            <div key={notification.id}>
                {notification.type === "joined" ? (
                <p>🟢 {notification.username} joined the chat</p>
                ) : (
                <p>🔴 {notification.username} left the chat</p>
                )}
            </div>
        ))}

        <MessageList messages={messages} username={username}/>

        <MessageInput username={username} />
        </div>
    );
}

export default ChatPage;