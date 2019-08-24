const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE_MESSAGE_TEXT';

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
    newMessageText: {
        text: 'Write you message!'
    },
};

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: Math.floor(Math.random() * 10000),
                message: state.newMessageText.text,
            };
            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage],
                newMessageText: {
                    text: ' ',
                }
            };
        }
        case UPDATE_MESSAGE_TEXT: {
            return{
                ...state,
                newMessageText: {
                    text: action.data,
                }
            }
        }
        default:
            return state;
    }
};

export const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    }
};

export const updateMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        data: text,
    }
};