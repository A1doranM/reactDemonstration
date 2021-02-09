import {profileAPI} from "../components/API/API";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    postsData: [
        {id: Math.floor(Math.random() * 1000000), text: "First post"},
        {id: Math.floor(Math.random() * 1000000), text: "Second post"},
        {id: Math.floor(Math.random() * 1000000), text: "Third post"},
        {id: Math.floor(Math.random() * 1000000), text: "Fourth post"},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: {
        text: ""
    },
};

export type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                    // @ts-ignore
                    ...state, profile: {...state.profile, photos: action.photos}
                }
            }
        }
        default:
            return state;
    }
};

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}

export const addPostActionCreator = (newPostBody: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPostBody: newPostBody,
    }
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfileActionCreator = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile,
    }
};

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
}

export const setUserStatusActionCreator = (status: string): SetUserStatusActionType => {
    return {
        type: SET_USER_STATUS,
        status: status,
    }
};

type SavePhotoActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoActionCreator = (photos: PhotosType): SavePhotoActionType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos,
    }
};

export const getUserProfileThunkCreator = (userID: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userID);
    dispatch(setUserProfileActionCreator(response.data));
};

export const getUserStatusThunkCreator = (userID: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userID);
    dispatch(setUserStatusActionCreator(response.data));
};

export const updateUserStatusThunkCreator = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatusActionCreator(status));
        }
    } catch (e) {
        console.error("ERROR PROFILE REDUCER: ", e);
    }
};

export const savePhotoThunkCreator = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoActionCreator(response.data.data.photos));
    }
};

export const saveProfileThunkCreator = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userID;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
    }
};