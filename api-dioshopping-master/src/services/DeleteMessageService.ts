import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

class DeleteMessageService{
    async execute(id){
        const messageRepository = getCustomRepository(MessagesRepository);

        //const newMessage = messageRepository.delete(id);
        const element = await messageRepository.findOne(id);
        
        const newMessage = await messageRepository.remove(element);

        /* return newMessage;  */
        const allMessages = await messageRepository.find();

        return allMessages;
    }
}

export { DeleteMessageService }
