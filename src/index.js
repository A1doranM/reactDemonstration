import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let dataUsers = [
    {id: 1, name: 'Max'},
    {id: 2, name: 'Daria'},
    {id: 3, name: 'Alex'},
    {id: 4, name: 'Dimas'},
];

let dataMessages = [
    {id: 1, message: 'Hi Max'},
    {id: 2, message: 'Hi Daria'},
    {id: 3, message: 'Hi Alex'},
    {id: 4, message: 'Hi Dimas'},
];

ReactDOM.render(<App dataUsers={dataUsers} dataMessages={dataMessages}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
