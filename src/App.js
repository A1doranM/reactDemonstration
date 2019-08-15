import React from 'react';
import {Route} from "react-router-dom";

import './App.css';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';

function App(props) {
debugger;
    return (
        <div className="app-wrapper">
            <Header/>
            <Navigation/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => {
                    return <Dialogs dialogs={props.state.dialogsPage}
                                    dispatch={props.dispatch}
                    />
                }}/>
                <Route path='/profile' render={() => {
                    return <Profile profileData={props.state.dialogsPage}
                                    dispatch={props.dispatch}/>
                }}/>
            </div>
        </div>
    );
}

export default App;
