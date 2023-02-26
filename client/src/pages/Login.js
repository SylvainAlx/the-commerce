import { useEffect, useState } from "react"
import axios from "axios";
import { saveJwt } from "../controllers/Jwt.js";
import {useDispatch, useSelector} from "react-redux"
import { setUser } from "../store/slices/userSlice.js";

const Login = () => {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data,setData] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(()=>{
        console.log(user)
    },[user])


    const loginAxios = async (payload) => {
        axios.post("http://localhost:9875/login", payload)
            .then(response => {
                saveJwt(response)
                dispatch(setUser(response.data.user))
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleClick = (e) => {
        e.preventDefault()
        console.log(email+" "+password)
        loginAxios({email,password})

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