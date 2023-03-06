import express from "express";
import { getCart, addProduct, deleteProduct } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/getcart/:id", getCart);
cartRouter.post("/addProduct", addProduct);
cartRouter.delete("/deleteProduct/:id", deleteProduct);

export default cartRouter;
