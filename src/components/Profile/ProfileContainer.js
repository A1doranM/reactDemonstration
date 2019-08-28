import React from 'react';
import {connect} from "react-redux";

import Profile from "./Profile";
import {
    getUserProfileThunkCreator, getUserStatusThunkCreator, updateUserStatusThunkCreator,
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userID = this.props.match.params.userID;
        this.props.getUserProfileThunkCreator(userID);
        this.props.getUserStatusThunkCreator(userID);
    };

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatusThunkCreator}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {
        getUserProfileThunkCreator: getUserProfileThunkCreator,
        getUserStatusThunkCreator: getUserStatusThunkCreator,
        updateUserStatusThunkCreator: updateUserStatusThunkCreator,
    }),
)(ProfileContainer);