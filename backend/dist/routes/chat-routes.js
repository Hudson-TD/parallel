import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteUserChats, generateChatCompletion, getAllUserChats, } from "../controllers/chat-controllers.js";
// Protected
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, getAllUserChats);
chatRoutes.delete("/delete", verifyToken, deleteUserChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map