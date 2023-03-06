import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Product = () => {

    const id = useParams().id;
    const [product, setProduct] = useState({})
    const user = useSelector((state) => state.user);

    useEffect(()=> {
        fetch(`http://localhost:9875/public/getproduct/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setProduct(data)
            })
            .catch((e) => console.log(e));
    },[])

    const handleClick = async (e) => {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch("http://localhost:9875/cart/addproduct", {
                method: 'POST',
                headers: {authorization: `Bearer ${jwt}`,'Content-Type': 'application/json'},
                body: JSON.stringify({product:product,user:user})
            })
            const data = await response.json()
            console.log(data)
    }


    return (
        <div className="product">
            <h2>{product.name}</h2>
            {product.images !== undefined && 
            <img src={`http://localhost:9875/images/${product.images[0]}`} alt={product.images} width="60%"/>
            }
            <h3>{product.price}€</h3>
            <p>{product.description}</p>
            <div className="navlink" onClick={handleClick}>acheter</div>
        </div>
    )
}

export default Product