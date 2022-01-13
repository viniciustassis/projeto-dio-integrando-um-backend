import { Request, Response } from "express";
import { UpdateMessageService } from "../services/UpdateMessageService";

class UpdateMessageController{
    async handle(request: Request, response: Response){
        const { id, email, message } = request.body;

        const updateMessageService = new UpdateMessageService();

        const newMessage = await updateMessageService.execute( id, {email, message });

        return response.json(newMessage);
    }
}

export { UpdateMessageController }