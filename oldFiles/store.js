// import {profileReducer} from "./profileReducer";
// import {dialogsReducer} from "./dialogsReducer";
// import {sidebarReducer} from "./sidebarReducer";
//
// let store = {
//     _state: {
//         dialogsPage: {
//             dataUsers: [
//                 {id: 1, name: 'Max'},
//                 {id: 2, name: 'Daria'},
//                 {id: 3, name: 'Alex'},
//                 {id: 4, name: 'Dimas'},
//             ],
//             dataMessages: [
//                 {id: 1, message: 'Hi Max'},
//                 {id: 2, message: 'Hi Daria'},
//                 {id: 3, message: 'Hi Alex'},
//             ],
//             newMessageText: {
//                 text: 'Write you message!'
//             },
//         },
//         profilePage: {
//             postsData: [
//                 {id: 1, text: 'First post'},
//                 {id: 2, text: 'Second post'},
//                 {id: 3, text: 'Third post'},
//                 {id: 4, text: 'Fourth post'},
//             ],
//             newPostText: {
//                 text: 'Write you post!'
//             },
//         },
//         sidebar: {},
//     },
//
//     _callSubscriber(){},
//
//     dispatch(action){
//
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action);
//
//         this._callSubscriber(this._state);
//     },
//
//     subscribe(observer){
//         this._callSubscriber = observer;
//     },
//
//     get getState(){
//         return this._state;
//     }
// };
//
// export default store;