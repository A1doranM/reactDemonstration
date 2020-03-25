import {profileAPI} from "../components/API/API";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    postsData: [
        {id: Math.floor(Math.random() * 1000000), text: "First post"},
        {id: Math.floor(Math.random() * 1000000), text: "Second post"},
        {id: Math.floor(Math.random() * 1000000), text: "Third post"},
        {id: Math.floor(Math.random() * 1000000), text: "Fourth post"},
    ],
    profile: null,
    status: "",
    photos: [],
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
                    text: "",
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
            return {
                ...state,
                status: action.status,
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state, profile: {...state.profile, photos: action.photos}
                }
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

export const deletePostActionCreator = (postID) => {
    return {
        type: DELETE_POST,
        postID: postID,
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

export const savePhotoActionCreator = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos,
    }
};

export const getUserProfileThunkCreator = (userID) => async (dispatch) => {
    let response = await profileAPI.getProfile(userID);
    dispatch(setUserProfileActionCreator(response.data));
};

export const getUserStatusThunkCreator = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID);
    dispatch(setUserStatusActionCreator(response.data));
};

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatusActionCreator(status));
        }
    } catch (e) {
        console.error("ERROR PROFILE REDUCER: ", e);
    }
};

export const savePhotoThunkCreator = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if(response.data.resultCode === 0) {
      dispatch (savePhotoActionCreator(response.data.data.photos));
  }
};

export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userID;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
    }
};