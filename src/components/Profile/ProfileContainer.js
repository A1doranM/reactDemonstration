import React from 'react';
import {connect} from "react-redux";

import Profile from "./Profile";
import {
    getUserProfileThunkCreator,
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount(){
        let userID = this.props.match.params.userID;

        if(!userID){
            userID = 2;
        }
        this.props.getUserProfileThunkCreator(userID);
    };

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
};

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfileThunkCreator: getUserProfileThunkCreator}),
)(ProfileContainer);