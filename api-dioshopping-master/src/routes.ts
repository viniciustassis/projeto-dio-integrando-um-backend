import { Router, Request, Response } from "express";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ListMessageController } from "./controllers/ListMessageController";
import { UpdateMessageController } from "./controllers/UpdateMessageController";
import { DeleteMessageController } from "./controllers/DeleteMessageController";

const router = Router();

const createMessageController = new CreateMessageController();
const listMessageController = new ListMessageController();
const updateMessageController = new UpdateMessageController();
const deleteMessageController = new DeleteMessageController();

router.get('/', (request: Request, response: Response) => {
    return response.json({message: 'Bem vindo a API Dio Shopping'})
})

router.get('/message', listMessageController.hanle)
router.post('/message', createMessageController.handle)
router.put('/message', updateMessageController.handle)
router.delete('/message', deleteMessageController.handle)

export { router }
