import React from 'react';
import preLoader from "../../../assets/images/preLoader.gif"
import styleFor from './Preloader.module.css'

let Preloader = () =>{
    return (
        <img src={preLoader} className={styleFor.preLoader} alt='Loading'/>
    );
};

export default Preloader;