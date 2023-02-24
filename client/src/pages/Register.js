
import { useState } from "react"
import RegisterAxios from "../controllers/RegisterController.js"

const Register = () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        console.log(email+" "+password)
        RegisterAxios({email,password})

    }

    const handleChange = (e) => {
        if(e.target.name==="email"){
            setEmail(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }

    return (
        <form method="post" >
            <fieldset>
                <legend>Inscrivez-vous</legend>
                <input type="email" name="email" placeholder="e-mail" value={email} required onChange={handleChange} />
                <input type="password" name="password" placeholder="mot de passe" value={password} required onChange={handleChange} />
                <input type="submit" value="s'inscrire" onClick={handleClick}/> 
            </fieldset>
        </form>
    )
}

export default Register;