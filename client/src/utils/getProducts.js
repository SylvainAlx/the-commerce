export const getProducts = () => {
    fetch("http://localhost:9875/public/getproducts")
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
            })
            .catch((e) => console.log(e));
}