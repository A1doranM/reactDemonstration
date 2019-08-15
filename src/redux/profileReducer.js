const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

let initialState =  {
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
    let addPost = () =>{
        let newPost = {
            id: 5,
            text: state.newPostText.text,
        };
        state.postsData.push(newPost);
    };

    let changeNewPostText = (newText) => {
        state.newPostText.text = newText;
    };

    switch (action.type) {
        case ADD_POST:
            addPost();
            changeNewPostText('');
            return state;
        case UPDATE_POST_TEXT:
            changeNewPostText(action.data);
            return state;
        default:
            return state;
    }
};

export const addPostActionCreator = () =>{
    return{
        type: ADD_POST,
    }
};

export const updatePostTextActionCreator = (text) =>{
    return{
        type: UPDATE_POST_TEXT,
        data: text,
    }
};