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
    
    const form = formidable();
    
    form.parse(req, function (err, fields, files) {

        try {
            const product = new Product({
                name:fields.name,
                description:fields.description,
                quantity:fields.quantity,
                price:fields.price
            });

            if(files.images){
                //ajout de l'image
                const extension = files.images.originalFilename.split(".").pop();
                let oldpath = files.images.filepath;
                let newpath ="public/images/" + files.images.newFilename + "." + extension;
                fs.copyFile(oldpath, newpath, function (err) {
                    if (err) {
                        res.send(err);
                    }
                });
                product.images.push(files.images.newFilename + "." + extension);
            }

            product.save();
            res.send(JSON.stringify({"nouveau produit":product}))

        } catch(err) {
            res.send(err)
        }
    })

    
}

export const deleteProduct = async (req,res) => {
    const i = req.params.id;
    try {
        const products = await Product.find()
        const ID = products[i]._id
        Product.findByIdAndDelete(ID, (err) => {
            if (err) res.send(err);
            res.send(JSON.stringify({"produit":"supprimé"}))
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
        
            const newProduct = {
                name:fields.name,
                description:fields.description,
                quantity:fields.quantity,
                price:fields.price
            }

            const update = async () => {

                try {

                    const i = req.params.id;
                    const products = await Product.find()
                    const product = products[i]

                    if(files.images){
                            //ajout de l'image
                            const extension = files.images.originalFilename.split(".").pop();
                            let oldpath = files.images.filepath;
                            let newpath ="public/images/" + files.images.newFilename + "." + extension;
                            fs.copyFile(oldpath, newpath, function (err) {
                                if (err) {
                                    res.send(err);
                                }
                            });
                            product.images.push(files.images.newFilename + "." + extension);
                    }

                    const findAndUpdate = await Product.findByIdAndUpdate(product._id, newProduct);
                    res.send(JSON.stringify({"mise à jour":product}))
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