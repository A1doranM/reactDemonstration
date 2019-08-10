import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import store from "./redux/store";

export let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App appState={store.getState}
                 addPost={store.addPost.bind(store)}
                 addMessage={store.addMessage.bind(store)}
                 changeNewPostText={store.changeNewPostText.bind(store)}/>
        </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree();

store.subscribe(rerenderEntireTree);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
