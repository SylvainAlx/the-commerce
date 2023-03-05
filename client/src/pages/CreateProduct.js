import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { serialize } from 'object-to-formdata';

const CreateProduct = () => {

    const navigate = useNavigate()

    const [product,setProduct] = useState({
        name: "",
        images:[],
        description: "",
        quantity: 0,
        price: 0
    })


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        if(name!=="images"){
            setProduct({...product, [name]: value})
        }
        else{
            setProduct({...product, [name]: e.target.files[0]})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("jwt");

        try {
            const formData = serialize(product)

            const response = await fetch("http://localhost:9875/admin/createproduct", {
                method: 'POST',
                headers: { authorization: `Bearer ${jwt}`},
                body: formData
            })
            const data = await response.json()
            console.log(data)
            navigate("/admin")
        }
        catch(err){
            console.log(err)
        }
    }

    /*useEffect(() => {
        console.log(product)
    }, [product])*/


    return (
        <>
            <h2>Créer un produit</h2>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Nouveau produit</legend>
                <input type="text" name="name" value={product.name} placeholder="titre" onChange={handleChange}/>
                <input type="file" name="images" onChange={handleChange}/>
                <textarea name="description" value={product.description} placeholder="description" rows={10} onChange={handleChange}/>
                <input type="number" name="quantity" value={product.quantity} placeholder="quantité" onChange={handleChange}/>
                <input type="number" name="price" value={product.price} placeholder="quantité" onChange={handleChange}/>
                <input type="submit" value="Ajouter le produit"/> 
            </fieldset>
        </form>
        </>
    )
}

export default CreateProduct