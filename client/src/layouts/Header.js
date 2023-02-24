import { Link } from "react-router-dom"
import "../assets/styles/header.scss"

const Header = () => {
    return (
        <header>
            <h1>Thé Commerce !</h1>
            <nav>
                <Link className="navlink" to="/login">se connecter</Link>
                <Link className="navlink" to="/register">s'inscrire</Link>
            </nav>
        </header>
    )
}

export default Header