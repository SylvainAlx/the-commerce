import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { serialize } from 'object-to-formdata';

const UpdateProduct = () => {

    const id = useParams().id;
    const navigate = useNavigate()
    
    const [product,setProduct] = useState({
        name:"",
        images:[],
        description:"",
        quantity:0,
        price:0
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
            
            const response = await fetch(`http://localhost:9875/admin/updateproduct/${id}`, {
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
                        <input type="file" name="images" onChange={handleChange}/>
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