import '../styles/Header.css'
import logo from '../logo&title.svg'

function Header() {
    return  (
    <div className='gpm-header'>
        <img src={logo} alt='Groupomania' className='gpm-logo-header' />
    </div>
    )
}

export default Header