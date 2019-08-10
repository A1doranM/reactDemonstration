import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import './App.css';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';

function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => {
                        return <Dialogs dialogs={props.appState.getState.dialogsPage}
                                        addMessage={props.addMessage}/>
                    }}/>
                    <Route path='/profile' render={() => {
                        return <Profile profileData={props.appState.profilePage}
                                        addPost={props.addPost}
                                        changeNewPostText={props.changeNewPostText}/>
                    }}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
