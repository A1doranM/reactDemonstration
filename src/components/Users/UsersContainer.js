import {connect} from "react-redux";
import {
    followingInProgressActionCreator, getUsersThunkCreator,
    setCurrentPageActionCreator, userFollowThunkCreator, userUnfollowThunkCreator
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       onPageChanged={this.onPageChanged}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow: userFollowThunkCreator,
        unfollow: userUnfollowThunkCreator,
        setCurrentPage: setCurrentPageActionCreator,
        setFollowingInProgress: followingInProgressActionCreator,
        getUsersThunkCreator: getUsersThunkCreator,
    })
)(UsersContainer);