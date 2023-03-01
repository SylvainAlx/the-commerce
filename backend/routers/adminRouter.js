import express from "express";
import { getUsers, admin, deleteUser } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/all", getUsers);
adminRouter.post("/setadmin", admin);
adminRouter.post("/delete", deleteUser);

export default adminRouter;
