import React from 'react';
import User from "./User/User";

const Users = (props) => {
    let usersList = props.users.map((user) => {
        return <User key={user.id} user={user}/>
    });
    return (
        <div>
            {usersList}
        </div>
    )
};

export default Users;