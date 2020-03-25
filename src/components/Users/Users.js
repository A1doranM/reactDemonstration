import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

let Users = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       portionSize={props.portionSize}/>
            {
                props.users.map((user) => {
                    return (
                        <User key={user.id}
                              user={user}
                              followingInProgress={props.followingInProgress}
                              unfollow={props.unfollow}
                              follow={props.follow}/>
                    )
                })
            }
        </div>
    )
};

export default Users;