import React from 'react';
import styleFor from './User.module.css'
import userPhoto from '../../assets/images/download.png'

let Users = (props) => {

    let pagesCount = props.totalUsersCount / props.pageSize;

    let pages = [];
    for (let i = 1; i < pagesCount + 1; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page) => {
                    return (
                        <span className={props.currentPage === page && styleFor.selectedPage}
                              onClick={(e) => {
                                  props.onPageChanged(page);
                              }}>{page}</span>
                    )
                })}
            </div>
            {
                props.users.map((user) =>
                        <div key={user.id}>
                <span>
                    <div>
                        <img src={userPhoto} className={styleFor.userPhoto} alt=''/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {
                                props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(user.id)
                            }}>Follow</button>}

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
            }
        </div>
    )
};

export default Users;