const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

let initialState = {
    postsData: [
        {id: Math.floor(Math.random() * 1000000), text: 'First post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Second post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Third post'},
        {id: Math.floor(Math.random() * 1000000), text: 'Fourth post'},
    ],
    newPostText: {
        text: 'Write you post!'
    },
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                text: state.newPostText.text,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: {
                    text: '',
                }
            };
        }
        case UPDATE_POST_TEXT: {
            return {
                ...state,
                newPostText: {
                    text: action.data,
                },
            };
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => {
    return {
        type: ADD_POST,
    }
};

export const updatePostTextActionCreator = (text) => {
    return {
        type: UPDATE_POST_TEXT,
        data: text,
    }
};