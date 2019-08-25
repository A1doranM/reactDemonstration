import React from 'react';
import styleFor from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) =>{
    return (
        <header className={styleFor.header}>
            <img src='/src/logo.svg' alt='header pic 1'/>
            <div className={styleFor.login}>
                {props.isAuth ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
};

export default Header;