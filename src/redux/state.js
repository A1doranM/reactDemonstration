import {rerenderEntireTree} from "../rerender";

let state = {
    dialogsPage: {
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
            {id: 4, message: 'Hi Dimas'},
            {id: 4, message: 'Hi Dimas'},
            {id: 4, message: 'Hi Dimas'},
            {id: 4, message: 'Hi Dimas'},
        ],
    },
    profilePage: {
        postsData: [
            {text: 'First post'},
            {text: 'Second post'},
            {text: 'Third post'},
            {text: 'Fourth post'},
        ],
    },
};

export let addPost = (postText) =>{
    let newPost = {
      text: postText,
    };
    state.profilePage.postsData.push(newPost);
    rerenderEntireTree(state);
};

export let addMessage = (message) =>{
    let newMessage = {
        id: 5,
        message: message.text,
    };
    state.dialogsPage.dataMessages.push(newMessage);
    rerenderEntireTree(state);
};

export default state;