import axios from "axios";

const LoginAxios = (payload) => {

    axios.post("http://localhost:9875/login", payload)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

}

export default LoginAxios