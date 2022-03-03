import '../styles/Header.css'
import logo from '../logo&title.svg'

function Header() {
    return  (
    <nav className="navbar navbar-expand-sm navbar-light">    
        <div className='header-wrapper'>
            <img src={logo} alt='Groupomania' className='header-logo' />
            <div className='header-link'><a href="./Home">Home</a></div>
            <div className='header-link'><a href="./Connect">Connectez-vous</a></div>
            <div className='header-link'><a href="./Disconnect">Déconnectez-vous</a></div>
            <div className='header-link'><a href="./Subscribe">Inscrivez-vous</a></div>
        </div>
    </nav>
    )
}

export default Header