import express from "express";
import { getUsers } from "../controllers/usersController.js";


const usersRouter = express.Router();

usersRouter.get("/all", getUsers)

export default usersRouter;