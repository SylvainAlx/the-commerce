import { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:9875/public/getproducts")
            .then((resp) => resp.json())
            .then((json) => {
                setProducts(json)
            })
            .catch((e) => console.log(e));
    },[])

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        fetch("http://localhost:9875/admin/all", {
            headers: { authorization: `Bearer ${jwt}` },
        })
            .then((resp) => resp.json())
            .then((json) => setUsers(json))
            .catch((e) => console.log(e));
    }, []);

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.id)
    }

    const handleChange = (e) => {
        

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
                    <a href="/admin/createproduct">CRER UN PRODUIT</a>
                    {products.map((product, i) => {
                        return (
                            <form key={i}>
                                <fieldset>
                                <legend><a href={`/product/${i}`}>Article n°{i}</a></legend>
                                <input type="text" id={i} name="name" value={product.name} onChange={handleChange}/>
                                <textarea id={i} name="description" onChange={handleChange} value={product.description}/>
                                <input id={i} name="quantity" type="number" value={product.quantity} onChange={handleChange}/>
                                <input id={i} type="checkbox" onChange={handleChange}/>
                                <input id={i} type="submit" value="APPLIQUER" onClick={handleClick}/>
                                </fieldset>
                            </form>
                        );
                    })}
                </main>
            </section>
        </div>
        </>
    );
};

export default Admin;
