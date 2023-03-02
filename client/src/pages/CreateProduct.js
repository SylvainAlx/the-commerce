import { useEffect, useState } from "react"
import axios from "axios";

const CreateProduct = () => {

    const [product,setProduct] = useState()
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [quantity,setQuantity] = useState(0)
    const [price,setPrice] = useState(0)


    const handleClick = (e) => {
        e.preventDefault()
        const newProduct = {
            name,
            description,
            quantity,
            price
        }
        setProduct(newProduct)
        const jwt = localStorage.getItem("jwt");
        fetch("http://localhost:9875/admin/createproduct", {
            method: 'POST',
            headers: { authorization: `Bearer ${jwt}`,"Content-Type": "application/json" },
            body: JSON.stringify(product)
        })
            .then((resp) => console.log(resp))
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
    }

    const handleChange = (e) => {

        const value = e.target.value
        const prop = e.target.name
        if(prop==="name"){
            setName(value)
        }
        else if(prop==="description"){
            setDescription(value)
        }
        else if(prop==="quantity"){
            setQuantity(value)
        }
        else{
            setPrice(value)
        }
    }


    return (
        <>
            <h2>Créer un produit</h2>
            <form method="post" >
            <fieldset>
                <legend>Nouveau produit</legend>
                <input type="text" name="name" value={name} placeholder="titre" required onChange={handleChange} />
                <textarea name="description" value={description} placeholder="description" required onChange={handleChange}/>
                <input type="number" name="quantity" placeholder="quantité" onChange={handleChange}/>
                <input type="number" name="price" placeholder="prix" onChange={handleChange}/>
                <input type="submit" value="Ajouter le produit" onClick={handleClick}/> 
            </fieldset>
        </form>
        </>
    )
}

export default CreateProduct