import { useEffect, useState } from "react";

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
                            <h4><a href={`/product/${i}`}>{product.name}</a></h4>
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