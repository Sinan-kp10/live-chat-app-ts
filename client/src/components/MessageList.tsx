import type { MessageListProps } from "../type/chat";


function MessageList({ messages, username }: MessageListProps) {
    return (
        <div className="chat-messages">
            <p className="chat-ttl-notice">
                <span>⏱️ Messages are automatically removed after 24 hours</span>
            </p>
            {messages.map((msg) => (
            <div
                key={msg._id}
                className={`message ${msg.username === username ? "my-message" : "other-message"}`}
            >
                <div className="message-bubble">
                    <strong className="message-sender">
                        {msg.username === username ? "You" : msg.username}
                    </strong>

                    <p className="message-text">{msg.message}</p>

                    <small className="message-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </small>
                </div>
            </div>
        ))}
        </div>
    );
}

export default MessageList;