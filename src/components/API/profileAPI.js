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
// export const profileAPI = {
//     getProfile(userID){
//         return instance.get(`profile/` + userID);
//     },
//     getStatus(userID){
//         return instance.get(`profile/status/` + userID);
//     },
//     updateStatus(status){
//         return instance.put(`profile/status/`, {status: status});
//     },
//     savePhoto(photoFile) {
//         const formData = new FormData();
//         formData.append("image", photoFile);
//
//         return instance.put("profile/photo", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         });
//     }
// };