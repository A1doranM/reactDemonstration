import React, {useState} from 'react';
import styleFor from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../Status/ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import userPhoto from "../../../assets/images/download.png";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const changeEditMode = () => {
        setEditMode(true);
    };

    const onSubmit = (formData) => {
        saveProfile(formData);
        setEditMode(false);
    };

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={styleFor.profileInfo}>
            <div className={styleFor.description}>
                <img src={profile.photos.large || userPhoto} className={styleFor.mainPhoto} alt={''}/>
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                {editMode ?
                    <ProfileDataForm initialValues = {profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} changeEditMode={changeEditMode}/>}
                <div>{profile.aboutMe}</div>
            </div>
            <div>
                <ProfileStatusWithHooks initialValues status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
};

const ProfileData = ({profile, isOwner, changeEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={changeEditMode}>edit</button>
            </div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {profile.contacts && Object.keys(profile.contacts).map(key => {
                return (
                    <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key]}
                    />
                )
            })}
            </div>

        </div>
    )
};

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={styleFor.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default ProfileInfo;