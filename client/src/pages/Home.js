import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:9875/public/getproducts")
            .then((resp) => resp.json())
            .then((json) => {
                setProducts(json)
            })
            .catch((e) => console.log(e));
    },[])

    return (
        <>
            <h2>Liste des produits</h2>
            <main>
                {products.map((product,i) => {
                    return (
                        <article key={i}>
                            <h4><Link to={`/product/${i}`}>{product.name}</Link></h4>
                            <div>
                                {product.images.forEach((image,i)=>{
                                    return (
                                        <img src={`http://localhost:9875/images/${product.images[i]}`} alt={image} width="100px"/>
                                    )
                                })}
                            </div>
                            <h5>{product.price}€</h5>
                            <em>Quantité : {product.quantity}</em>
                        </article>
                    )
                })}
            </main>
        </>
    )
}

export default Home