import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {

    const navigate = useNavigate()

    const [product,setProduct] = useState({
        name: "",
        description: "",
        quantity: 0,
        price: 0
    })


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("jwt");

        try {
            const response = await fetch("http://localhost:9875/admin/createproduct", {
                method: 'POST',
                headers: { authorization: `Bearer ${jwt}`,"Content-Type": "application/json" },
                body: JSON.stringify(product)
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
            <form method="post" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Nouveau produit</legend>
                <input type="text" name="name" value={product.name} placeholder="titre" required onChange={handleChange} />
                <input type="file" />
                <textarea name="description" value={product.description} placeholder="description" required onChange={handleChange}/>
                <input type="number" name="quantity" placeholder="quantité" onChange={handleChange}/>
                <input type="number" name="price" placeholder="prix" onChange={handleChange}/>
                <input type="submit" value="Ajouter le produit"/> 
            </fieldset>
        </form>
        </>
    )
}

export default CreateProduct