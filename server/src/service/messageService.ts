import { Message } from "../models/Message";

export const createMessage = async (username: string, message: string) => {

    return await Message.create({
        username,
        message,
    });
};

export const getMessages = async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    return await Message.find({
        createdAt: {
            $gte: twentyFourHoursAgo,
        },
    }).sort({createdAt: 1});
};