import '../styles/Home.css';
import logo from '../logo&title.svg';
import React from 'react';

function Home() {
    return  (
    <div className='gpm-home'>
        <img src={logo} alt='Groupomania' className='gpm-logo-home' />
    </div>
    )
}

export default Home