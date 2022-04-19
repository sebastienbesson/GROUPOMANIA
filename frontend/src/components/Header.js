import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Collapse } from 'react-bootstrap';
import '../styles/Header.css';
import logo from '../logo&title.svg';

function Header() {
    const user = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    if(user){
        return  (
            <nav className="navbar navbar-light">
                <img src={logo} alt='Groupomania' className='header-logo' />
                <Button onClick={() => setOpen(!open)} className="header-btn" aria-controls="example-collapse-text" aria-expanded={open} >
                    <span>Menu</span>
                </Button> 
                <Collapse in={open}>
                    <div className='header-wrapper'>
                        <div className='header-link'><Link to="/Home">Accueil</Link></div>
                        <div className='header-link'><Link to="/Disconnect">Déconnectez-vous</Link></div>
                        <div className='header-link'><Link to="/Account">Mon Compte</Link></div>
                    </div>
                </Collapse>
            </nav>
        )
    } 
    else {
        return(
            <nav className="navbar navbar-light">
                <img src={logo} alt='Groupomania' className='header-logo' />
                <Button onClick={() => setOpen(!open)} className="header-btn" aria-controls="example-collapse-text" aria-expanded={open} >
                    <span>Menu</span>
                </Button>  
                <Collapse in={open}>
                    <div className='header-wrapper'>
                        <div className='header-link-disconnect'><Link to="/Connect">Connectez-vous</Link></div>
                        <div className='header-link-disconnect'><Link to="/Subscribe">Inscrivez-vous</Link></div>
                    </div>
                </Collapse>
            </nav>    
        )
    }
}

export default Header