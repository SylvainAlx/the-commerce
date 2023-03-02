import express from "express";
import { getProducts, getProduct } from "../controllers/publicController.js";

const publicRouter = express.Router();

publicRouter.get("/getproducts", getProducts)
publicRouter.get("/getproduct/:id", getProduct)

export default publicRouter;