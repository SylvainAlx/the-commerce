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
            <h2>Modification</h2>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>modifier le produit</legend>
                    <input type="text" name="name" value={product.name} placeholder="titre" onChange={handleChange}/>
                    {product.images !== undefined && 
                                <img src={`http://localhost:9875/images/${product.images[0]}`} alt={product.images} width="100%"/>
                    }
                    <input type="file" name="images" onChange={handleChange}/>
                    <textarea name="description" value={product.description} placeholder="description" rows={10} onChange={handleChange}/>
                    <input type="number" name="quantity" value={product.quantity} placeholder="quantité" onChange={handleChange}/>
                    <input type="number" name="price" value={product.price} placeholder="quantité" onChange={handleChange}/>
                    <input type="submit" value="APPLIQUER" />
                </fieldset>
            </form>
        </>
    )
}

export default UpdateProduct