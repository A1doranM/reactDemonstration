import {getAuthUserDataThunkCreator} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
    initialized: boolean;
}

let initialState: InitialStateType = {
    initialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS;
}

export const setInitializedSuccess = (): InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS,
    }
};

export const setInitializeSuccessThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    promise.then(() => {
        dispatch(setInitializedSuccess());
    })
};
