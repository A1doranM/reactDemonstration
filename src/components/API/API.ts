import axios from "axios";
import {ProfileType} from "../../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "849246fb-1531-4da7-b81e-ddd60f9def36"
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    userUnfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data;
            });
    },
    userFollow(userID = 1) {
        return instance.post(`follow/${userID}`, null)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userID: number) {
        console.warn("Deprecated. Use profileAPI.getProfile");
        return profileAPI.getProfile(userID);
    },
};

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get(`profile/` + userID);
    },
    getStatus(userID: number) {
        return instance.get(`profile/status/` + userID);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status});
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
};

export enum ResultCodesEnum {
    SUCCESS = 0,
    ERROR = 1,
}

export enum ResultCodesEnumWithCaptcha {
    CAPTCHA_REQUIRED = 10,
}

type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string,
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>,
};

type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodesEnumWithCaptcha,
    messages: Array<string>,
    data: {
        userID: number
    }
};

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>("auth/login", {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete("auth/login");
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
};