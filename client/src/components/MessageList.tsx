interface Message {
    _id: string;
    username: string;
    message: string;
    createdAt: string;
}

interface MessageListProps {
    messages: Message[];
    username: string;
}

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