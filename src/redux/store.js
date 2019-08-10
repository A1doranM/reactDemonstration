let store = {
    _state: {
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
            newPostText: {
                text: 'write you post'
            },
        },
    },

    _callSubscriber(){},

    addPost(postText){

        let newPost = {
            text: postText,
        };
        this._state.profilePage.postsData.push(newPost);
        this._callSubscriber();
    },

    addMessage(message){
        let newMessage = {
            id: 5,
            message: message.text,
        };
        this._state.dialogsPage.dataMessages.push(newMessage);
        this._callSubscriber();
    },

    changeNewPostText(newText){
        this._state.profilePage.newPostText.text = newText;
        this._callSubscriber();
    },

    subscribe(observer){
        this._callSubscriber = observer;
    },

    get getState(){
        return this._state;
    }
};

export default store;