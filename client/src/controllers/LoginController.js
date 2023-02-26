import axios from "axios";
import {saveJwt} from "./Jwt.js";
import { authSlice } from "../store/slices/authSlice.js";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";

const LoginAxios = (payload) => {

    //const getAuth = useSelector(state => state.auth)
    //const [auth, setAuth] = useState(false)

    useEffect(()=>{

        axios.post("http://localhost:9875/login", payload)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            saveJwt(data)
        });

    },[])
    
}

export default LoginAxios