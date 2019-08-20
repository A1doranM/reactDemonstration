import React from 'react';
import {Route} from "react-router-dom";

import './App.css';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import DialogsContainer from "./components/Dialogs/DialogsContainer";

function App(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navigation/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => {
                    return <DialogsContainer />
                }}/>
                <Route path='/profile' render={() => {
                    return <Profile />
                }}/>
            </div>
        </div>
    );
}

export default App;
