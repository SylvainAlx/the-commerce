import User from "../models/userSchema.js";


export const register = async (req,res) => {

    const {email,password} = req.body
    const user = new User({
        email,
        password,
        isAdmin: email === "sylval49@gmail.com"
    });
    user.save()
    .then ((user) => {
        res.status(201).json({message:"Enregistrement effectué"});
    })
    .catch((error) => {
        res.status(400).json({error});
    })
 }

 export const login = async (req,res) => {

    const {email,password} = req.body
    const user = await User.findOne({email})

    .then((user) => {
        user.comparePassword(password, async (err, isMatch) => {
            if (isMatch) {
                const jwt = user.createJWT();
                res.status(200).json({user,jwt});
            }
            else {
                res.status(400).json({message:err})
            }
        })
    })
    .catch((err)=> {
        res.status(400).json({message:err})
    })
}
