import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Admin = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const getproducts = () => {
        fetch("http://localhost:9875/public/getproducts")
            .then((resp) => resp.json())
            .then((json) => {
                setProducts(json)
            })
            .catch((e) => console.log(e));
    }
    const getUsers = () => {
        const jwt = localStorage.getItem("jwt");
        fetch("http://localhost:9875/admin/getusers", {
            headers: { authorization: `Bearer ${jwt}` },
        })
            .then((resp) => resp.json())
            .then((json) => setUsers(json))
            .catch((e) => console.log(e));
    }

    useEffect(()=> {
        getUsers()
        getproducts()
    },[])

    const handleUpdate = (e) => {
        const id = e.target.id
        navigate(`/admin/updateproduct/${id}`)

    }
    const handleDelete = async (e) => {
        const jwt = localStorage.getItem("jwt");
        try {
            const response = await fetch(`http://localhost:9875/admin/deleteproduct/${e.target.id}`, {
                method: 'GET',
                headers: { authorization: `Bearer ${jwt}`,"Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)
            getproducts()
        }
        catch(err){
            console.log(err)
        }


    }


    return (
        <>
        <h2>Page d'administration</h2>
        <div className="container">
            
            <section>
                <h3>Utilisateurs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>email</th>
                            <th>administrateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "oui" : "non"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
            <section>
                <h3>Articles</h3>
                <main>
                    <Link to="/admin/createproduct">CRER UN PRODUIT</Link>
                    {products.map((product, i) => {
                        return (
                            <div className="productAdmin"key={i}>
                                <h5>{product.name}</h5>
                                <div>
                                    <button id={i} onClick={handleUpdate}>MODIFIER</button>
                                    <button id={i} onClick={handleDelete}>SUPPRIMER</button>
                                </div>
                                
                            </div>
                        );
                    })}
                </main>
            </section>
        </div>
        </>
    );
};

export default Admin;
