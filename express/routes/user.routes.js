import { Router } from "express";

import { index } from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get('/', index);

export default userRouter;