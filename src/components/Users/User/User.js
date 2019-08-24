import React from 'react';
import styleFor from "../User.module.css";

let User = (props) =>{
    return(
        <div key={props.key}>
                <span>
                    <div>
                        <img src={props.user.photo} className={styleFor.userPhoto} alt='user photo'/>
                    </div>
                    <div>
                        {props.follow
                            ? <button onClick={props.follow(props.key)}>Unfollow</button>
                            : <button onClick={props.unfollow(props.key)}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{props.user.name}</div>
                        <div>{props.user.status}</div>
                    </span>
                    <span>
                        <div>{props.user.location.city}</div>
                        <div>{props.user.location.country}</div>
                    </span>
                </span>
        </div>
    )
};

export default User;