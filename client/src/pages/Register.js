import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios";
import {useDispatch} from "react-redux"
import { setUser } from "../store/slices/userSlice.js";

const Register = () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const registerAxios = async (payload) => {
        axios.post("http://localhost:9875/register", payload)
            .then(response => {
                localStorage.setItem('jwt', response.data.jwt)
                dispatch(setUser(response.data.user))
                navigate("/")
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(email+" "+password)
        registerAxios({email,password})

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
                <input type="password" name="password" autoComplete="on" placeholder="mot de passe" value={password} required onChange={handleChange} />
                <input type="submit" value="s'inscrire" onClick={handleClick}/> 
            </fieldset>
        </form>
    )
}

export default Register;