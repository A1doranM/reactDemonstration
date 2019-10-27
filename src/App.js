import React from 'react';
import {Route, withRouter} from "react-router-dom";

import './App.css';

import {logoutThunkCreator} from "./redux/authReducer";
import {connect} from 'react-redux';
import {compose} from "redux";
import {setInitializeSuccessThunkCreator} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

import Navigation from './components/Navigation/Navigation';
import HeaderContainer from "./components/Header/HeaderContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));

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
                    <Route path='/dialogs' render={() => {
                        return (
                            <React.Suspense  fallback={<div>Loading...</div>}>
                                <DialogsContainer/>
                            </React.Suspense>
                        )
                    }
                    }/>
                    <Route path='/profile/:userID?' render={() => {
                        return (
                            <React.Suspense  fallback={<div>Loading...</div>}>
                                <ProfileContainer/>
                            </React.Suspense>
                        )
                    }
                    }/>
                    <Route path='/users' render={() => {
                        return (
                            <React.Suspense  fallback={<div>Loading...</div>}>
                                <UsersContainer/>
                            </React.Suspense>
                        )
                    }
                    }/>
                    <Route path='/login' render={() => {
                        return (
                            <React.Suspense  fallback={<div>Loading...</div>}>
                                <LoginContainer/>
                            </React.Suspense>
                        )
                    }
                    }/>
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
