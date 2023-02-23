import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images: Array,
    quantity:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
},{
    timestamps: true
});

export const Product = mongoose.model("Product", productSchema);