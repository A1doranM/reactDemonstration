import React from 'react';
import {BrowserRouter} from "react-router-dom";

import {addMessage, addPost} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

export let rerenderEntireTree = (props) => {
    ReactDOM.render(
        <BrowserRouter>
            <App appState={props}
                 addPost={addPost}
                 addMessage={addMessage}/>
        </BrowserRouter>, document.getElementById('root'));
};
