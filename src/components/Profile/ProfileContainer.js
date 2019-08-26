import React from 'react';
import {connect} from "react-redux";

import Profile from "./Profile";
import {
    getUserProfileThunkCreator,
} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount(){
        let userID = this.props.match.params.userID;

        if(!userID){
            userID = 2;
        }
        this.props.getUserProfileThunkCreator(userID);
    };

    render() {
        if(!this.props.isAuth){
            return <Redirect to={'/login'}/>
        }

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
    }
};

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfileThunkCreator: getUserProfileThunkCreator})(WithUrlDataContainerComponent);