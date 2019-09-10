const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    dataUsers: [
        {id: Math.floor(Math.random() * 1000000), name: 'Max'},
        {id: Math.floor(Math.random() * 1000000), name: 'Daria'},
        {id: Math.floor(Math.random() * 1000000), name: 'Alex'},
        {id: Math.floor(Math.random() * 1000000), name: 'Dimas'},
    ],
    dataMessages: [
        {id: Math.floor(Math.random() * 1000000), message: 'Hi Max'},
        {id: Math.floor(Math.random() * 1000000), message: 'Hi Daria'},
        {id: Math.floor(Math.random() * 1000000), message: 'Hi Alex'},
    ],
};

export const dialogsReducer = (state = initialState, action) => {

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

export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody: newMessageBody,
    }
};
