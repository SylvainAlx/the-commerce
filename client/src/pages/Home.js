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
                            <Link to={`/product/${i}`}><h4>{product.name}</h4>
                            {product.images !== undefined && 
                                <img src={`http://localhost:9875/images/${product.images[0]}`} alt={product.images} width="100%"/>
                            }
                            </Link>
                            <h5>{product.price}€</h5>
                            <em>Disponibilité : {product.quantity}</em>
                        </article>
                    )
                })}
            </main>
        </>
    )
}

export default Home