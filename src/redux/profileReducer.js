import {usersAPI} from "../components/API/API";

const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postsData: [
        {id: Math.floor(Math.random() * 1000000), text: 'First post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Second post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Third post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Fourth post'},
    ],
    newPostText: {
        text: 'Write you post!'
    },
    profile: null,
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                text: state.newPostText.text,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: {
                    text: '',
                }
            };
        }
        case UPDATE_POST_TEXT: {
            return {
                ...state,
                newPostText: {
                    text: action.data,
                },
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => {
    return {
        type: ADD_POST,
    }
};

export const updatePostTextActionCreator = (text) => {
    return {
        type: UPDATE_POST_TEXT,
        data: text,
    }
};

export const setUserProfileActionCreator = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
};

export const getUserProfileThunkCreator = (userID) => {
    return (dispatch) => {
        usersAPI.getProfile(userID)
            .then(response => {
                dispatch(setUserProfileActionCreator(response.data));
            });
    };
};