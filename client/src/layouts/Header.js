import { Link } from "react-router-dom"
import "../assets/styles/header.scss"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {setUser} from "../store/slices/userSlice.js"

const Header = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        localStorage.removeItem('jwt');
        dispatch(setUser({email:"",isAdmin:false}))
        navigate("/")
    }


    return (
        <header>
            <h1>Tea Shop</h1>
            <nav>
                <Link className="navlink" to="/">produits</Link>
                {user.isAdmin && 
                    <Link className="navlink" to="/admin">administration</Link>
                }
                {!user.email ? (
                    <>
                        <Link className="navlink" to="/login">se connecter</Link>
                        <Link className="navlink" to="/register">s'inscrire</Link>
                    </>
                ):(
                    <>
                    <Link className="navlink" to="/cart">panier</Link>
                    <div className="navlink" onClick={handleClick}>se déconnecter</div>
                    </>
                )
                }
            </nav>
        </header>
    )
}

export default Header