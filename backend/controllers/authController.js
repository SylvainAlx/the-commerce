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
                res.status(201).json({message:"Enregistrement effectué"});
            });
        }
        else {
            res.status(409).json({message:"utilisateur déjà existant"});
        }
    }
    catch {
        res.status(400).json({message:"erreur"});
    }
 }

 export const login = async (req,res) => {

    const user = await User.findOne({ email: req.body.email });
    if (user){
        bcrypt.compare(
            req.body.password,
            user.password,
            function (err, result) {
                if (result) {
                    res.status(200).json({message:"connexion réussi"});
                } else {
                    res.status(401).json({message:"connexion reffusée"});
                }
            }
        );
    }
 }