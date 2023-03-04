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
        <>
        <h2>{product.name}</h2>
        {product.images !== undefined && 
        <img src={`http://localhost:9875/images/${product.images[0]}`} alt={product.images} width="300px"/>
        }
        <h3>{product.description}</h3>
        </>
    )
}

export default Product