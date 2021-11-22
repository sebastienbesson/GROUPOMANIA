import '../styles/Header.css'
import logo from '../logo&title.svg'


function Header() {
    return  (
    <nav className="navbar navbar-expand-sm navbar-light">    
        <div className='gpm-header'>
            <img src={logo} alt='Groupomania' className='gpm-logo-header' />
            <a href="./">Home</a>
            <a href="./Connect">Connectez-vous</a>
            <a href="./Subscribe">Inscrivez-vous</a>
        </div>
    </nav>
    )
}

export default Header