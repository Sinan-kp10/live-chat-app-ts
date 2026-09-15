import { createMessage, getMessages} from "../service/messageService";

export const createMessageController = async ( username: string, message: string) => {

    if(!username || !message){
        throw new Error("Username and Name Required")
    }

    return await createMessage(username, message);
};

export const getMessagesController = async () => {
    return await getMessages();
};