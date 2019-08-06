import React from 'react';
import styleFor from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation = (props) => {
    return (
        <nav className={styleFor.nav}>
            <div className={styleFor.navItem}>
                <NavLink to="/profile" activeClassName={styleFor.active}>Profile</NavLink>
            </div>
            <div className={styleFor.navItem}>
                <NavLink to="/dialogs" activeClassName={styleFor.active}>Dialogs</NavLink>
            </div>
            <div className={styleFor.navItem}>
                <NavLink to="/news" activeClassName={styleFor.active}>News</NavLink>
            </div>
            <div className={styleFor.navItem}>
                <NavLink to="/music" activeClassName={styleFor.active}>Music</NavLink>
            </div>
            <div className={styleFor.navItem}>
                <NavLink to="/settings" activeClassName={styleFor.active}>Settings</NavLink>
            </div>
        </nav>
    )
};

export default Navigation;