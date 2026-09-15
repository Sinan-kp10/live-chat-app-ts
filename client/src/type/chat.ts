export interface Message {
  _id: string;
  username: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "joined" | "left";
  username: string;
}

export interface ChatPageProps {
    username: string;
}

export interface MessageListProps {
    messages: Message[];
    username: string;
}
