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
        <div className="chat-container">
            <header className="chat-header">
                <div className="chat-header-main">
                    <div className="chat-header-title-group">
                        <div className="chat-status-pulse"></div>
                        <h1 className="chat-title">Live Chat</h1>
                    </div>
                    <p className="online-users">
                        <span className="online-dot">🟢</span> {onlineUsers} {onlineUsers === 1 ? "person" : "people"} online
                    </p>
                </div>
                <div className="chat-header-user">
                    <span className="user-welcome">Welcome, <strong>{username}</strong> 👋</span>
                </div>
            </header>

            <div className="chat-main">
                <div className="chat-messages-column">
                    <MessageList messages={messages} username={username} />
                </div>

                <aside className="system-activity">
                    <div className="system-activity-header">
                        <h4 className="system-activity-title">System Activity</h4>
                        <span className="system-activity-count">{notifications.length}</span>
                    </div>
                    <div className="system-messages-list">
                        {notifications.length === 0 ? (
                            <p className="no-activity">No recent activity</p>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`system-message ${notification.type === "joined" ? "system-joined" : "system-left"}`}
                                >
                                    {notification.type === "joined" ? (
                                        <p>
                                            <span className="system-dot">🟢</span>
                                            <span className="system-text">
                                                <strong>{notification.username}</strong> joined the chat
                                            </span>
                                        </p>
                                    ) : (
                                        <p>
                                            <span className="system-dot">🔴</span>
                                            <span className="system-text">
                                                <strong>{notification.username}</strong> left the chat
                                            </span>
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </aside>
            </div>

            <footer className="chat-footer">
                <MessageInput username={username} />
            </footer>
        </div>
    );
}

export default ChatPage;