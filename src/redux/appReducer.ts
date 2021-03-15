import {getAuthUserDataThunkCreator} from "./authReducer";
import { InferActionsTypes } from './redux_store';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false
};


export type InitialStateType = typeof initialState;

export const actions = {
    setInitializedSuccess: () => ({type: INITIALIZED_SUCCESS})
};

type ActionType = InferActionsTypes<typeof actions>;

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

export const setInitializeSuccessThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    promise.then(() => {
        dispatch(actions.setInitializedSuccess());
    })
};
