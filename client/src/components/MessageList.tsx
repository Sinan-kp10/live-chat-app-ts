import type { MessageListProps } from "../type/chat";


function MessageList({ messages, username }: MessageListProps) {
    return (
        <div>
        {messages.map((msg) => (
            <div key={msg._id}>
            <strong>
                {msg.username === username ? "You" : msg.username}
            </strong>

            <p>{msg.message}</p>

            <small>
                {new Date(msg.createdAt).toLocaleTimeString()}
            </small>
            </div>
        ))}
        </div>
    );
}

export default MessageList;