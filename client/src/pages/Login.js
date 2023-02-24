import { useState } from "react"
import LoginAxios from "../controllers/LoginController.js"

const Login = () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        console.log(email+" "+password)
        LoginAxios({email,password})

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
                <legend>Connectez-vous</legend>
                <input type="email" name="email" placeholder="e-mail" value={email} required onChange={handleChange} />
                <input type="password" name="password" placeholder="mot de passe" value={password} required onChange={handleChange} />
                <input type="submit" value="se connecter" onClick={handleClick}/> 
            </fieldset>
        </form>
    )
}

export default Login;