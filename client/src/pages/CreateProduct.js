import { useState } from "react"
import axios from "axios";

const CreateProduct = () => {

    const [product,setProduct] = useState({})
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [quantity,setQuantity] = useState(0)
    const [price,setPrice] = useState(0)

    const handleClick = (e) => {
        e.preventDefault()
        

    }

    const handleChange = (e) => {

        const value = e.target.value

        switch(value){
            case 'name':
                setName(value);
            break;
            case 'description':
                setDescription(value);
                break;
            default: console.log("erreur")
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
                <input type="number" name="quantity" placeholder="quantité"/>
                <input type="number" name="price" placeholder="prix"/>
                <input type="submit" value="Ajouter le produit" onClick={handleClick}/> 
            </fieldset>
        </form>
        </>
    )
}

export default CreateProduct