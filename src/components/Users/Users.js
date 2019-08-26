import React from 'react';
import styleFor from './User.module.css'
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let pages = [];
    for (let i = 1; i < 10; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page) => {
                    return (
                        <span key={Math.floor(Math.random() * 1000000)}
                              className={props.currentPage === page && styleFor.selectedPage}
                              onClick={(e) => {
                                  props.onPageChanged(page);
                              }}>{page}</span>
                    )
                })}
            </div>
            {
                props.users.map((user) => {
                    return (
                        <div key={user.id}>
                            <span>
                                <div>
                                    <NavLink to={'/profile/' + user.id} activeClassName={styleFor.active}>
                                        <img src={user.photos.large} className={styleFor.userPhoto} alt=''/>
                                    </NavLink>
                                </div>
                            <div>
                                {user.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                        props.unfollow(user.id);
                                    }}>Unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                        props.follow(user.id);
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
                })
            }
        </div>
    )
};

export default Users;