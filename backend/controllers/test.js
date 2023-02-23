import { User } from "../models/userSchema.js"

export const test = async (req,res) => {
    const users = await User.find()
    res.send(users)
}