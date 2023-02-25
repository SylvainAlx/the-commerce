import axios from "axios";
import {saveJwt} from "./Jwt.js";

const RegisterAxios = (payload) => {

    axios.post("http://localhost:9875/register", payload)
    .then(response => {
        console.log(response);
        saveJwt(response)
    })
    .catch(error => {
        console.log(error);
    });

}

export default RegisterAxios