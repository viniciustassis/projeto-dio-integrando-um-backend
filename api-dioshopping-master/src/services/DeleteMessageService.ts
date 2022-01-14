import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

class DeleteMessageService {
    async execute(id){
        const messageRepository = getCustomRepository(MessagesRepository);

        const newMessage = await messageRepository.delete(id);

        const allMessages = await messageRepository.find();

        return allMessages;
    }
}

export  { DeleteMessageService }