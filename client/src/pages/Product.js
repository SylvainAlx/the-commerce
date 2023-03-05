import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {

    const id = useParams().id;
    const [product, setProduct] = useState({})

    useEffect(()=> {
        fetch(`http://localhost:9875/public/getproduct/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setProduct(data)
            })
            .catch((e) => console.log(e));
    },[])


    return (
        <div className="product">
            <h2>{product.name}</h2>
            {product.images !== undefined && 
            <img src={`http://localhost:9875/images/${product.images[0]}`} alt={product.images} width="60%"/>
            }
            <h3>{product.price}€</h3>
            <p>{product.description}</p>
            <div className="navlink">acheter</div>
        </div>
    )
}

export default Product