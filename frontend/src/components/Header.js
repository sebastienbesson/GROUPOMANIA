import { Link } from "react-router-dom";

import '../styles/Header.css'
import logo from '../logo&title.svg'

function Header() {
    return  (
    <nav className="navbar navbar-expand-sm navbar-light">    
        <div className='header-wrapper'>
            <img src={logo} alt='Groupomania' className='header-logo' />
            <div className='header-link'><Link to="/Home">Accueil</Link></div>
            <div className='header-link'><Link to="/Connect">Connectez-vous</Link></div>
            <div className='header-link'><Link to="/Disconnect">Déconnectez-vous</Link></div>
            <div className='header-link'><Link to="/Subscribe">Inscrivez-vous</Link></div>
            <div className='header-link'><Link to="/Account">Mon Compte</Link></div>
        </div>
    </nav>
    )
}

export default Header