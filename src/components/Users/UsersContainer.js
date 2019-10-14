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
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsersSelector,
} from "../../redux/selectors/usersSelector";

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
                       portionSize={this.props.portionSize}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
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