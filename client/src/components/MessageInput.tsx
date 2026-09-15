import { useState } from "react";
import { socket } from "../socket/socket";

interface MessageInputProps {
    username: string;
}

function MessageInput({ username }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        socket.emit("sendMessage", {
            username,
            message: trimmedMessage,
        });

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send</button>
        </form>
    );
}

export default MessageInput;