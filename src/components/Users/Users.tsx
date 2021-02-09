import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number,
    onPageChanged: (page: number) => void,
    totalUsersCount: number,
    pageSize: number,
    portionSize: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

let Users: React.FC<PropsType> = ({
                                      currentPage,
                                      onPageChanged,
                                      totalUsersCount,
                                      pageSize,
                                      portionSize,
                                      users,
                                      ...props
                                  }) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       portionSize={portionSize}/>
            {
                users.map((user) => {
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