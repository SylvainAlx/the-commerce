import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header.js";
import Footer from "./layouts/Footer.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin.js";
import Product from "./pages/Product.js";
import CreateProduct from "./pages/CreateProduct.js";
import UpdateProduct from "./pages/UpdateProduct.js";
import "./assets/styles/app.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/userSlice.js";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

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
                        <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
                        </>
                    )}
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
