const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

let initialState = {
    postsData: [
        {id: 1, text: 'First post'},
        {id: 2, text: 'Second post'},
        {id: 3, text: 'Third post'},
        {id: 4, text: 'Fourth post'},
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
            let stateCopy = {...state};
            stateCopy.postsData = Array.from(state.postsData);
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText.text = '';
            return stateCopy;
        }
        case UPDATE_POST_TEXT: {
            let stateCopy = {...state};
            state.newPostText.text = action.text;
            return stateCopy;
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