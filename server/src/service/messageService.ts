import { Message } from "../models/Message";

export const createMessage = async (username: string, message: string) => {

    return await Message.create({
        username,
        message,
    });
};

export const getMessages = async () => {
    return await Message.find().sort({ createdAt: 1 });
};