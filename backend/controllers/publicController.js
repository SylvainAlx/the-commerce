import Product from "../models/productSchema.js";

export const getProducts = async (req,res) => {
    const products = await Product.find()
    res.send(products)
}

export const getProduct = async (req,res) => {
    const products = await Product.find();
    const product = products[req.params.id];
    res.send(product)
}