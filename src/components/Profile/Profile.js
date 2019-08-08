import React from 'react';
import styleFor from './Profile.module.css';

import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={styleFor.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profileData} addPost={props.addPost}/>
        </div>
    )
};

export default Profile;