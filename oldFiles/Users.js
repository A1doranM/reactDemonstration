// import React from 'react';
// import User from "./User/User";
// import * as axios from 'axios'
// import styleFor from './User.module.css'
// import userPhoto from '../../assets/images/download.png'
//
// const Users = (props) => {
//
//     let getUsers = () => {
//         if (props.users.length === 0) {
//             axios.get('https://social-network.samuraijs.com/api/1.0/users')
//                 .then(response => {
//                     props.setUsers(response.data.items);
//                 });
//         }
//     };
//
//     return (
//         <div>
//             <button onClick={getUsers}>getUsers</button>
//             {
//                 props.users.map((user) =>
//                         <div key={user.id}>
//                 <span>
//                     <div>
//                         <img src={userPhoto} className={styleFor.userPhoto} alt=''/>
//                     </div>
//                     <div>
//                         {user.followed
//                             ? <button onClick={() => {props.unfollow(user.id)}}>Unfollow</button>
//                             : <button onClick={() => {props.follow(user.id)}}>Follow</button>}
//
//                     </div>
//                 </span>
//                             <span>
//                             <span>
//                                 <div>{user.name}</div>
//                                 <div>{user.status}</div>
//                              </span>
//                              <span>
//                                  <div>{'user.location.city'}</div>
//                                  <div>{'user.location.country'}</div>
//                              </span>
//                         </span>
//                         </div>
//                 )
//             }
//         </div>
//     )
// };
//
// export default Users;