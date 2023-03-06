import Cart from "../models/cartSchema.js";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

export const getCart = async (req,res) => {

    const user = await User.findOne({email:req.params.id})
    const cart = await Cart.findOne({user:user._id})

    if(cart==null){
        try {
            const newCart = new Cart ({
                user: user._id
            });
            newCart.save();
            res.send(newCart)
        }
        catch(err){
            res.send(err)
        }
    }
    else{
        res.send(cart)
    }
    

}

export const addProduct = async (req,res) => {

    const user = await User.findOne({email:req.body.user.email})
    const cart = await Cart.findOne({user:user._id})
    const product = await Product.findOne({name:req.body.product.name})
    cart.products.push(product)
    try {
        cart.save()
        res.send(cart)
    }
    catch(err){
        res.send(err)
    }

}

export const deleteProduct = async (req,res) => {
    
    try{
        const user = await User.findOne({email:req.body.user.email})
        console.log(user)
        const cart = await Cart.findOne({user:user._id})
        const i = req.params.id
        console.log(cart)
        //cart.products.splice(i,1)
        //cart.save()
        //res.send(cart)
    }
    catch(err){
        res.send(err)
    }

    
    
    
}