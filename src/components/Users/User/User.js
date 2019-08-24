import React from 'react';
import styleFor from "../User.module.css";

let User = (props) =>{

    // let follow = () =>{
    //     props.follow(props.id);
    // };
    //
    // let unfollow = () =>{
    //     props.unfollow(props.id);
    // };

    return(
        <div key={props.user.id}>
                <span>
                    <div>
                        <img src={props.user.photo} className={styleFor.userPhoto} alt=''/>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button onClick={() => {props.follow(props.user.id)}}>Unfollow</button>
                            : <button onClick={() => {props.unfollow(props.user.id)}}>Follow</button>}
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