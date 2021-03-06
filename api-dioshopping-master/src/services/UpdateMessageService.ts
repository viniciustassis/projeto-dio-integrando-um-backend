import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

interface IMessage {
    email: string;
    message: string
}

class UpdateMessageService {
    async execute(id, {email, message}: IMessage){
        const messageRepository = getCustomRepository(MessagesRepository);

        if(!email){
            throw new Error("Por favor informe um email!")
        }

        if(!message){
            throw new Error("Por favor escreva uma messagem!")
        }

        const newMessage = messageRepository.update(id, { email, message });

        /* await messageRepository.save(newMessage); */
        const element = await messageRepository.findOne(id);

        return element;
    }
}

export  { UpdateMessageService }