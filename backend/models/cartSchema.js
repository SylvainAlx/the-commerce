import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: []
    }
},{
    timestamps: true
});

export default mongoose.model("Cart", cartSchema);