import React from 'react';
import styleFor from './User.module.css'
import {NavLink} from "react-router-dom";
import * as axios from "axios/index";

let Users = (props) => {

    let pagesCount = props.totalUsersCount / props.pageSize;

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
                                        props.setFollowingInProgress(true, user.id);
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '849246fb-1531-4da7-b81e-ddd60f9def36'
                                            },
                                        })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.unfollow(user.id)
                                                }
                                                props.setFollowingInProgress(false, user.id);
                                            });

                                    }}>Unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                        props.setFollowingInProgress(true, user.id);
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, null, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '849246fb-1531-4da7-b81e-ddd60f9def36'
                                                },
                                        })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(user.id);
                                                }
                                                props.setFollowingInProgress(false, user.id);
                                            });

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