import User from "../models/userSchema.js";

export const getUsers = async (req,res) => {
    const users = await User.find()
    res.send(users)
}

export const admin = async (req,res) => {
    try{
        const user = await User.updateOne({email:req.body.email}, { $set: {isAdmin:req.body.isAdmin} } )
        res.send(user)
    }
    catch(e){
        console.log(e)
    }
    
}

export const deleteUser = async (req,res) => {
    const ID = req.body.id
    User.findByIdAndDelete(ID, (err) => {
        if (err){
            console.log(err);
        }
        else {
            res.send("utilisateur supprimé")
        }
    });

}