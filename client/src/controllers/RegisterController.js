import axios from "axios";

const RegisterAxios = (payload) => {

    axios.post("http://localhost:9875/register", payload)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

}

export default RegisterAxios