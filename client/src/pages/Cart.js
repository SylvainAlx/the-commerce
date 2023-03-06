import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../store/slices/cartSlice.js";

const Cart = () => {

    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch()

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(()=> {
        const jwt = localStorage.getItem("jwt");
        fetch(`http://localhost:9875/cart/getcart/${user.email}`,{
            method: 'GET',
            headers: { authorization: `Bearer ${jwt}`},
        })
            .then((resp) => resp.json())
            .then((data) => {
                dispatch(setCart(data))
                let total = 0
                data.products.forEach((product,i)=>{
                    total += product.price
                })
                setTotalPrice(total)
                
            })
            .catch((e) => console.log(e));
    },[])

    const handleclick = (e) => {
        const id = e.target.id
        const jwt = localStorage.getItem("jwt");
        fetch(`http://localhost:9875/cart/deleteproduct/${id}`,{
            method: 'DELETE',
            headers: { authorization: `Bearer ${jwt}`,"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .catch((e) => console.log(e));
    }


    return (
        <>
        <h2>Votre panier</h2>
        <table>
            <thead>
                <tr>
                    <th>nom du produit</th>
                    <th>prix</th>
                </tr>
            </thead>
            {cart.products !== undefined &&
            <>
                <tbody>
                    {cart.products.map((product,i)=>{
                        return (
                            <tr key={i}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><button id={i} onClick={handleclick}>RETIRER</button></td>
                            </tr>
                        )
                    })}

                </tbody>
                <tfoot>
                    <tr>
                        <td>prix total : {totalPrice}</td>
                    </tr>

                </tfoot>
            </>
            }
            
        </table>

        </>
    )

}

export default Cart;