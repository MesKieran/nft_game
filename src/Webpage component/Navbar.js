import React from 'react';
import {Link} from "react-router-dom";
import {act} from '@testing-library/react'


function Navbar(){
    return (
        <div className='navbar'>
        <div className='navbar-logo'>
            TreesTogether
        </div>
            <ul className='navbar-menu'>
                <li><a href="/">Home</a></li>
                <li><a href="/game">Game</a></li>
            </ul>
        </div>
        
    )
}

export default Navbar