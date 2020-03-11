import React from 'react';
import styleFor from "../User.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/download.png";

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div key={user.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id} activeClassName={styleFor.active}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styleFor.userPhoto} alt=''/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => {
                                                 unfollow(user.id);
                                             }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id);
                                  }}>Follow</button>
                    }
                    </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.city'}</div>
                    <div>{'user.location.country'}</div>
                </span>
            </span>
        </div>
    )
};

export default User;