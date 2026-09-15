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
        <div className="message-input">
            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="message-input-field"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button type="submit" className="message-send-btn">
                    <span>Send</span>
                </button>
            </form>
        </div>
    );
}

export default MessageInput;