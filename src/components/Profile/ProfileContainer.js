import React from 'react';
import {connect} from "react-redux";

import Profile from "./Profile";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    updateUserStatusThunkCreator,
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    refreshProfile() {
        console.log("PROPS PASSED TO USER: ", this.props);
        let userID = this.props.match.params.userID;
        if (!userID) {
            if (this.props.isAuth) {
                userID = this.props.authorizedUserID;
            } else {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfileThunkCreator(userID);
        this.props.getUserStatusThunkCreator(userID);
    };

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile();
        }
    };


    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userID}
                     profile={this.props.profile}
                     status={this.props.status}
                     savePhoto={this.props.savePhotoThunkCreator}
                     saveProfile={this.props.saveProfileThunkCreator}
                     updateStatus={this.props.updateUserStatusThunkCreator}/>
        );
    };
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserID: state.auth.userID,
        isAuth: state.auth.isAuth,
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, {
        getUserProfileThunkCreator: getUserProfileThunkCreator,
        getUserStatusThunkCreator: getUserStatusThunkCreator,
        updateUserStatusThunkCreator: updateUserStatusThunkCreator,
        savePhotoThunkCreator: savePhotoThunkCreator,
        saveProfileThunkCreator: saveProfileThunkCreator
    }),
)(ProfileContainer);