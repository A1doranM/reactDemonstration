import * as axios from "axios/index";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '849246fb-1531-4da7-b81e-ddd60f9def36'
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    userUnfollow(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },
    userFollow(userID = 1) {
        return instance.post(`follow/${userID}`, null)
            .then(response => {
                return response.data;
            })
    },
    getProfile(userID){
        console.warn('Deprecated. Use profileAPI.getProfile');
        return profileAPI.getProfile(userID);
    },
};

export const profileAPI = {
    getProfile(userID){
        return instance.get(`profile/` + userID);
    },
    getStatus(userID){
        return instance.get(`profile/status/` + userID);
    },
    updateStatus(status){
        return instance.put(`profile/status/`, {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete('auth/login');
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
};