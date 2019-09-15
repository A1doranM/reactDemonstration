import {authAPI} from "../components/API/API";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING = 'SET_FETCHING';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetchingValue,
            };
        default:
            return state;
    }
};

export const setUserDataActionCreator = (userID, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {
            userID: userID,
            email: email,
            login: login,
            isAuth: isAuth
        },
    }
};

export const setFetchingActionCreator = (fetchingValue) => {
    return {
        type: SET_FETCHING,
        fetchingValue: fetchingValue,
    }
};

export const getAuthUserDataThunkCreator = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setUserDataActionCreator(id, email, login, true));
            }
        });
};

export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunkCreator());
            }
        });
};

export const logoutThunkCreator  = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserDataActionCreator(null, null, null, false));
            }
        });
};