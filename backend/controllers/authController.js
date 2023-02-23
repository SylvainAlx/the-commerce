import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req,res) => {

    try {
        const {email,password} = req.body
        const utilisateur = await User.findOne({email})
        if(!utilisateur){
            // Générer le hash avec bcrypt
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return err;
                }
                const user = new User({
                    email,
                    password: hash,
                    isAdmin: email === "sylval49@gmail.com"
                });
                user.save();
                res.send(user)
            });
        }
        else {
            res.send("utilisateur déjà existant")
        }
    }
    catch {
        res.send("erreur")
    }
 }
