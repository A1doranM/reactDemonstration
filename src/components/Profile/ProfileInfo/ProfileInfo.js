import React from 'react';
import styleFor from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import StatusWithHooks from "../Status/StatusWithHooks";

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
                <StatusWithHooks status={props.status}
                        updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;