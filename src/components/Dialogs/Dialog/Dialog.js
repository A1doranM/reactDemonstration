import React from 'react';
import styleFor from './Dialog.module.css';
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let path = "/dialog/" + props.id;

    return (
        <div className={styleFor.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};

export default Dialog;