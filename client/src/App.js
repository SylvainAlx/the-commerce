import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin.js";
import Product from "./pages/Product.js";
import CreateProduct from "./pages/CreateProduct.js";
import "./assets/styles/app.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/userSlice.js";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);

    //vérification du client
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            fetch("http://localhost:9875/auth/verify", {
                headers: { authorization: `Bearer ${jwt}` },
            })
                .then((resp) => resp.json())
                .then((json) => dispatch(setUser(json)));
        } else {
            dispatch(setUser({ email: "", isAdmin: false }));
        }
    }, []);

    //récupération des produits
    useEffect(() => {
        fetch("http://localhost:9875/public/getproducts")
            .then((resp) => resp.json())
            .then((json) => {
                setProducts(json)
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {user.isAdmin && (
                        <>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/createproduct" element={<CreateProduct />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
