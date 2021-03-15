import {ResultCodesEnum, ResultCodesEnumWithCaptcha} from "../components/API/API";
import { FormAction, stopSubmit } from 'redux-form';
import { authAPI } from '../components/API/authAPI';
import { securityAPI } from '../components/API/securityAPI';
import { BaseThunkType, InferActionsTypes } from './redux_store';

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

export const actions = {
    setUserDataActionCreator: (userID: number | null,
                               email: string | null,
                               login: string | null,
                               isAuth: boolean) => {
        return {
            type: SET_USER_DATA,
            payload: {
                userID: userID,
                email: email,
                login: login,
                isAuth: isAuth
            },
        } as const;
    },

    setCaptchaUrlActionCreator: (captchaUrl: string) => {
        return {
            type: SET_CAPTCHA,
            payload: {captchaUrl: captchaUrl},
        } as const;
    }
};
type ActionType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType | FormAction>;

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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

export const getAuthUserDataThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();

    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(actions.setUserDataActionCreator(id, email, login, true));
    }
};

export const loginThunkCreator = (email: string,
                                  password: string,
                                  rememberMe: boolean,
                                  captchaUrl: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (response.resultCode === ResultCodesEnum.SUCCESS) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
        if (response.messages.length > 0) {
            let message = response.messages[0];
            dispatch(stopSubmit("login", {_error: message}));
        } else {
            if (response.resultCode === ResultCodesEnumWithCaptcha.CAPTCHA_REQUIRED) {
                dispatch(getCaptchaUrlThunkCreator());
            }
            dispatch(stopSubmit("login", {_error: "Some error"}));
        }
    }
};

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodesEnum.SUCCESS) {
        dispatch(actions.setUserDataActionCreator(null, null, null, false));
    }

};

export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(actions.setCaptchaUrlActionCreator(captchaUrl));
};