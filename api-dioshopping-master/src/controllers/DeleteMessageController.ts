import { Request, Response } from "express";
import { DeleteMessageService } from "../services/DeleteMessageService";

class DeleteMessageController{
    async handle(request: Request, response: Response){
        const { id } = request.body;

        const deleteMessagesService = new DeleteMessageService();

        const newMessage = await deleteMessagesService.execute( id );

        return response.json(newMessage);
    }
}

export { DeleteMessageController }