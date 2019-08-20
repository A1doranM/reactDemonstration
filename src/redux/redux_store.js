import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogsReducer";
import {profileReducer} from "./profileReducer";
import {sidebarReducer} from "./sidebarReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;