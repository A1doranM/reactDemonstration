// import * as axios from "axios/index";
//
// const instance = axios.create({
//     withCredentials: true,
//     baseURL: `https://social-network.samuraijs.com/api/1.0/`,
//     headers: {
//         'API-KEY': '849246fb-1531-4da7-b81e-ddd60f9def36'
//     },
// });
//
// export const usersAPI = {
//     getUsers(currentPage = 1, pageSize = 5) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//             .then(response => {
//                 return response.data;
//             });
//     },
//     userUnfollow(userID) {
//         return instance.delete(`follow/${userID}`)
//             .then(response => {
//                 return response.data;
//             })
//     },
//     userFollow(userID = 1) {
//         return instance.post(`follow/${userID}`, null)
//             .then(response => {
//                 return response.data;
//             })
//     },
//     getProfile(userID){
//         console.warn('Deprecated. Use profileAPI.getProfile');
//         return profileAPI.getProfile(userID);
//     },
// };