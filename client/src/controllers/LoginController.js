import axios from "axios";
import {saveJwt} from "./Jwt.js";

const LoginAxios = (payload) => {

    axios.post("http://localhost:9875/login", payload)
    .then(response => {
        console.log(response);
        saveJwt(response)
    })
    .catch(error => {
        console.log(error);
    });

}

export default LoginAxios