import React from "react";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";

import "./App.css";

import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {setInitializeSuccessThunkCreator} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

import Navigation from "./components/Navigation/Navigation";
import HeaderContainer from "./components/Header/HeaderContainer";
import store from "./redux/redux_store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends React.Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        console.error("UNHANDLED ERROR: ", promiseRejectionEvent);
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    };

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    };

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navigation/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={() => {
                            return (
                                <Redirect to="/profile"/>
                            )
                        }
                        }/>
                        <Route path="/dialogs" render={() => {
                            return (
                                <React.Suspense fallback={<Preloader/>}>
                                    <DialogsContainer/>
                                </React.Suspense>
                            )
                        }
                        }/>
                        <Route path="/profile/:userID?" render={() => {
                            return (
                                <React.Suspense fallback={<Preloader/>}>
                                    <ProfileContainer/>
                                </React.Suspense>
                            )
                        }
                        }/>
                        <Route path="/users" render={() => {
                            return (
                                <React.Suspense fallback={<Preloader/>}>
                                    <UsersContainer/>
                                </React.Suspense>
                            )
                        }
                        }/>
                        <Route path="/login" render={() => {
                            return (
                                <React.Suspense fallback={<Preloader/>}>
                                    <Login/>
                                </React.Suspense>
                            )
                        }
                        }/>
                        <Route path="*" render={() => {
                            return (
                                <div>404: Page not found</div>
                            )
                        }
                        }/>
                    </Switch>
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
            dispatch(setInitializeSuccessThunkCreator());
        },
    }
};

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App);

let MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default MainApp;