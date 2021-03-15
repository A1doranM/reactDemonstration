import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../components/API/profileAPI';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux_store';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  postsData: [
    { id: Math.floor(Math.random() * 1000000), text: 'First post' },
    { id: Math.floor(Math.random() * 1000000), text: 'Second post' },
    { id: Math.floor(Math.random() * 1000000), text: 'Third post' },
    { id: Math.floor(Math.random() * 1000000), text: 'Fourth post' },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: {
    text: ''
  },
};

export type InitialStateType = typeof initialState;
export const actions = {
  addPostActionCreator: (newPostBody: string) => {
    return {
      type: ADD_POST,
      newPostBody: newPostBody,
    }
  },

  setUserProfileActionCreator: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile: profile,
    }
  },

  setUserStatusActionCreator: (status: string) => {
    return {
      type: SET_USER_STATUS,
      status: status,
    }
  },

  savePhotoActionCreator: (photos: PhotosType) => {
    return {
      type: SAVE_PHOTO_SUCCESS,
      photos: photos,
    }
  },
};
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

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
          ...state, profile: { ...state.profile, photos: action.photos }
        }
      }
    }
    default:
      return state;
  }
};

export const getUserProfileThunkCreator = (userID: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getProfile(userID);
  dispatch(actions.setUserProfileActionCreator(response.data));
};

export const getUserStatusThunkCreator = (userID: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userID);
  dispatch(actions.setUserStatusActionCreator(response.data));
};

export const updateUserStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actions.setUserStatusActionCreator(status));
    }
  } catch (e) {
    console.error('ERROR PROFILE REDUCER: ', e);
  }
};

export const savePhotoThunkCreator = (file: any): ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(actions.savePhotoActionCreator(response.data.data.photos));
  }
};

export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
  const userId = getState().auth.userID;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfileThunkCreator(userId));
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
  }
};