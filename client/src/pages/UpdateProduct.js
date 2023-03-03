import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { serialize } from 'object-to-formdata';

const UpdateProduct = () => {

    const id = useParams().id;
    
    const [product,setProduct] = useState({
        name: "",
        description: "",
        quantity: 0,
        price: 0
    })

    const formDataNulle = new FormData()
    formDataNulle.append("name","toto")


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("jwt");
        try {
            const formData = serialize(product)
            const response = await fetch(`http://localhost:9875/admin/updateproduct/${id}`, {
                method: 'POST',
                headers: { authorization: `Bearer ${jwt}`,"Content-Type": "multipart/form-data" },
                body: formDataNulle
            })
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

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
            <h2>MODIFICATION</h2>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>modifier le produit</legend>
                    <label>Titre
                        <input type="text" name="name" value={product.name} onChange={handleChange}/>
                    </label>
                    <label>Image
                        <input type="file" name="images"/>
                    </label>
                    <label>Description
                        <textarea name="description" value={product.description} onChange={handleChange}/>
                    </label>
                    <label>Quantité
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange}/>
                    </label>
                    <label>Prix
                        <input type="number" name="price" value={product.price} onChange={handleChange}/>
                    </label>
                    <input type="submit" value="APPLIQUER" />
                </fieldset>
            </form>
        </>
    )
}

export default UpdateProduct