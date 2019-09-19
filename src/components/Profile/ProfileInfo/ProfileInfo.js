import React from 'react';
import styleFor from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import Status from "../Status/Status";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={styleFor.profileInfo}>
            <div className={styleFor.description}>
                <img src={props.profile.photos.small} alt={''}/>
                <div>{props.profile.aboutMe}</div>
            </div>
            <div>
                <Status status={props.status}
                        updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;