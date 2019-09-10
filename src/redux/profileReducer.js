import {profileAPI} from "../components/API/API";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    postsData: [
        {id: Math.floor(Math.random() * 1000000), text: 'First post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Second post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Third post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Fourth post'},
    ],
    profile: null,
    status: '',
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                text: action.newPostBody,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: {
                    text: '',
                }
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_USER_STATUS: {
            return{
                ...state,
                status: action.status,
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostBody) => {
    return {
        type: ADD_POST,
        newPostBody: newPostBody,
    }
};

export const setUserProfileActionCreator = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile,
    }
};

export const setUserStatusActionCreator = (status) => {
    return {
        type: SET_USER_STATUS,
        status: status,
    }
};

export const getUserProfileThunkCreator = (userID) => {
    return (dispatch) => {
        profileAPI.getProfile(userID)
            .then(response => {
                dispatch(setUserProfileActionCreator(response.data));
            });
    };
};

export const getUserStatusThunkCreator = (userID) => {
    return (dispatch) => {
        profileAPI.getStatus(userID)
            .then(response => {
                dispatch(setUserStatusActionCreator(response.data));
            });
    };
};

export const updateUserStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setUserStatusActionCreator(response.data));
                }
            });
    };
};