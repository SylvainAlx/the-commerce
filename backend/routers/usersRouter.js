import express from "express";
import { getUsers, admin, deleteUser } from "../controllers/usersController.js";


const usersRouter = express.Router();

usersRouter.get("/all", getUsers)
usersRouter.post('/admin', admin)
usersRouter.post('/delete', deleteUser)

export default usersRouter;