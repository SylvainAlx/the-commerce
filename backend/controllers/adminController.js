import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(e){
        res.send(e)
    }
};

export const createProduct = async (req,res) => {

    const {name,description,quantity,price} = req.body

    try {
        const product = new Product({
            name,
            description,
            quantity,
            price
        });
        product.save();
        res.send(product)
    } catch(err) {
        console.log(
            "ajout d'un produit impossible"
        );
    }
}

export const deleteProduct = async (req,res) => {

}