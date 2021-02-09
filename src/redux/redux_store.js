import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {dialogsReducer} from "./dialogsReducer.ts";
import {profileReducer} from "./profileReducer.ts";
import {sidebarReducer} from "./sidebarReducer.ts";
import {usersReducer} from "./usersReducer.ts";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./authReducer.ts";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./appReducer.ts";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebarPage: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;