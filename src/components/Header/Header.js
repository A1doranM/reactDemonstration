import React from 'react';
import styleFor from './Header.module.css';

const Header = (props) =>{
    return (
        <header className={styleFor.header}><img src='/src/logo.svg' alt='header pic 1'/></header>
    )
};

export default Header;