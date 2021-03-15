import { InferActionsTypes } from './redux_store';

const ADD_MESSAGE = "ADD_MESSAGE";

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dataUsers: [
        {id: Math.floor(Math.random() * 1000000), name: "Max"},
        {id: Math.floor(Math.random() * 1000000), name: "Daria"},
        {id: Math.floor(Math.random() * 1000000), name: "Alex"},
        {id: Math.floor(Math.random() * 1000000), name: "Dimas"},
    ] as Array<DialogType>,
    dataMessages: [
        {id: Math.floor(Math.random() * 1000000), message: "Hi Max"},
        {id: Math.floor(Math.random() * 1000000), message: "Hi Daria"},
        {id: Math.floor(Math.random() * 1000000), message: "Hi Alex"},
    ] as Array<MessageType>,
};

export const actions = {
    addMessageActionCreator: (newMessageBody: string) => {
        return {
            type: ADD_MESSAGE,
            newMessageBody: newMessageBody,
        } as const;
    }
};

export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: Math.floor(Math.random() * 10000),
                message: action.newMessageBody,
            };
            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage],
            };
        }
        default:
            return state;
    }
};
