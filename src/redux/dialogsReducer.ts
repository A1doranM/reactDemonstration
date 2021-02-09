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

export type InitialStateType = typeof initialState;

export const dialogsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): AddMessageActionType => {
    return {
        type: ADD_MESSAGE,
        newMessageBody: newMessageBody,
    }
};
