import express from "express";
import { getUsers, createProduct, deleteProduct, updateProduct} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getusers", getUsers);
adminRouter.post("/createproduct",createProduct)
adminRouter.get("/deleteproduct/:id",deleteProduct)
adminRouter.post("/updateproduct/:id",updateProduct)

export default adminRouter;
