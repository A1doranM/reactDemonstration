import React from 'react';
import styleFor from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div className={styleFor.profileInfo}>
            <div className={styleFor.image}>
                <img src='https://i.redd.it/ihoxdlxnodpy.jpg' alt='content pic 1'/>
            </div>
            <div className={styleFor.description}>
                About I
            </div>
        </div>
    )
};

export default ProfileInfo;