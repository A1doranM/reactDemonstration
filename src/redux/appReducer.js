import {getAuthUserDataThunkCreator} from "./authReducer";
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

export const setInitializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS,
    }
};

export const setInitializeSuccessThunkCreator = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    promise.then(() => {
        dispatch(setInitializedSuccess());
    })
};
