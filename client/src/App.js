import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin.js";
import "./assets/styles/app.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/userSlice.js";

const App = () => {
    const dispatch = useDispatch();

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

    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {user.isAdmin && (
                        <Route path="/admin" element={<Admin />} />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
