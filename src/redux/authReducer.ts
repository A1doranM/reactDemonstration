import {authAPI, securityAPI} from "../components/API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

let initialState = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl,
            };
        default:
            return state;
    }
};

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA,
    payload: {
        captchaUrl: string
    }
}

export const setCaptchaUrlActionCreator = (captchaUrl: string): SetCaptchaUrlActionType => {
    return {
        type: SET_CAPTCHA,
        payload: {captchaUrl: captchaUrl},
    }
};

type SetAuthUserDataActionPayloadType = {
    userID: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setUserDataActionCreator = (userID: number | null,
                                         email: string | null,
                                         login: string | null,
                                         isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {
            userID: userID,
            email: email,
            login: login,
            isAuth: isAuth
        },
    }
};

export const getAuthUserDataThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setUserDataActionCreator(id, email, login, true));
    }
};

export const loginThunkCreator = (email: string,
                                  password: string,
                                  rememberMe: boolean,
                                  captchaUrl: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
        if (response.data.messages.length > 0) {
            let message = response.data.messages[0];
            dispatch(stopSubmit("login", {_error: message}));
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrlThunkCreator());
            }
            dispatch(stopSubmit("login", {_error: "Some error"}));
        }
    }
};

export const logoutThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserDataActionCreator(null, null, null, false));
    }

};

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrlActionCreator(captchaUrl));
};