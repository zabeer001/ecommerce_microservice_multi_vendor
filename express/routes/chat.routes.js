import express from 'express';
import { chat } from '../controllers/chat.controller.js';

const chatRouter = express.Router();

chatRouter.get('/chat', chat.getChatPage); // <-- IMPORTANT

export default chatRouter;