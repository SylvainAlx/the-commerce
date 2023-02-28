import User from "../models/userSchema.js";

export const getUsers = async (req,res) => {
    const users = await User.find()
    res.send(users)
}