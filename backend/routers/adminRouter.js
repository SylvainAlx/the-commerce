import express from "express";
import { getUsers, createProduct, deleteProduct} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/all", getUsers);
adminRouter.post("/createproduct",createProduct)
adminRouter.get("/deleteproduct:id",deleteProduct)

export default adminRouter;
