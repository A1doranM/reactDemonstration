const ADD_MESSAGE = 'NEW_MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE_MESSAGE_TEXT';

let initialState = {
        dataUsers: [
            {id: 1, name: 'Max'},
            {id: 2, name: 'Daria'},
            {id: 3, name: 'Alex'},
            {id: 4, name: 'Dimas'},
        ],
        dataMessages: [
            {id: 1, message: 'Hi Max'},
            {id: 2, message: 'Hi Daria'},
            {id: 3, message: 'Hi Alex'},
        ],
        newMessageText: {
            text: 'Write you message!'
        },
    };

export const dialogsReducer = (state = initialState, action) => {
    let addMessage = () =>{
        let newMessage = {
            id: 5,
            text: state.newMessageText.text,
        };
        state.dataMessages.push(newMessage);
    };

    let changeMessageText = (newText) =>{
        state.newMessageText.text = newText;
    };

    switch (action.type) {
        case ADD_MESSAGE:
            addMessage();
            changeMessageText('');
            return state;
        case UPDATE_MESSAGE_TEXT:
            changeMessageText(action.data);
            return state;
        default:
            return state;
    }
};

export const addMessageActionCreator = () =>{
    return{
        type: ADD_MESSAGE,
    }
};

export const updateMessageTextActionCreator = (text) =>{
    return{
        type: UPDATE_MESSAGE_TEXT,
        data: text,
    }
};