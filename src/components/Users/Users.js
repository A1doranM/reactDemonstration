import React from 'react';
import * as axios from 'axios'
import styleFor from './User.module.css'
import userPhoto from '../../assets/images/download.png'

class Users extends React.Component {

    constructor(props) {
        super(props);

        this.getUsers();
    }

    getUsers = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    };


    render() {
        return (
            <div>
                {
                    this.props.users.map((user) =>
                            <div key={user.id}>
                <span>
                    <div>
                        <img src={userPhoto} className={styleFor.userPhoto} alt=''/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {
                                this.props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(user.id)
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
    }
}

export default Users