import React from 'react';
import {Route, withRouter} from "react-router-dom";

import './App.css';

import Navigation from './components/Navigation/Navigation';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {logoutThunkCreator} from "./redux/authReducer";
import {connect} from 'react-redux';
import {compose} from "redux";
import {setInitializeSuccessThunkCreator} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    };

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userID?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: () => {
            dispatch(setInitializeSuccessThunkCreator())
        },
        logout: () => {
            dispatch(logoutThunkCreator());
        },
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
