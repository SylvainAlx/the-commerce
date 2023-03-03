import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import formidable from "formidable";
import fs from "fs";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(e){
        res.send(e)
    }
};

export const createProduct = (req,res) => {
    console.log(req.body)

    try {
        const product = new Product({
            name:req.body.name,
            description:req.body.description,
            quantity:req.body.quantity,
            price:req.body.price
        });
        product.save();
        res.send(product)
    } catch(err) {
        res.send(err)
    }
}

export const deleteProduct = async (req,res) => {
    const i = req.params.id;
    try {
        const products = await Product.find()
        const ID = products[i]._id
        Product.findByIdAndDelete(ID, (err) => {
            if (err) res.send(err);
            res.status(200);
        });

    }
    catch(err){
        res.send(err)
    }
    
}

export const updateProduct = async (req,res) => {


    const form = formidable();
    
    form.parse(req, function (err, fields, files) {

        try {
            console.log(fields)
            //gestion de l'image
            const extension = files.images.originalFilename.split(".").pop();
            let oldpath = files.images.filepath;
            let newpath ="public/images/" + files.images.newFilename + "." + extension;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) {
                    res.send(err);
                }
            });
        
            const newProduct = {
                name:fields.name,
                images:files.images.newFilename + "." + extension,
                description:fields.description,
                quantity:fields.quantity,
                price:fields.price
            }
            const update = async () => {
                try {
                    const i = req.params.id;
                    const products = await Product.find()
                    const ID = products[i]._id
                    const product = await Product.findByIdAndUpdate(ID, newProduct);
                    res.status(201)
                }
                catch(err){
                    res.send(err)
                }
            }

            update()
            
        }
        catch(err){
            console.log(err)
            res.send(err)
        }

        
    })  

}