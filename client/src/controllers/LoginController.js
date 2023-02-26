import axios from "axios";
import {saveJwt} from "./Jwt.js";
import { authSlice } from "../store/slices/authSlice.js";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";

const LoginAxios = async (payload) => {

    //const getAuth = useSelector(state => state.auth)
    //const [auth, setAuth] = useState(false)

    
    try {
        const response = await axios.post("http://localhost:9875/login", payload)
        saveJwt(response)
    }
    catch(err){
        console.log(err);
    }
}

export default LoginAxios