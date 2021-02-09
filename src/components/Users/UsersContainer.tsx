import {connect} from "react-redux";
import {getUsersThunkCreator, userFollowThunkCreator, userUnfollowThunkCreator} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsersSelector,
} from "../../redux/selectors/usersSelector";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux_store";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    users: Array<UserType>
    totalUsersCount: number,
    portionSize: number,
    followingInProgress: Array<number>,
}

type MapDispatchPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

type OwnPropsType = {
    pageTitle: string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber: number) => {
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
        return {
            users: getUsersSelector(state),
            pageSize: getPageSize(state),
            totalUsersCount: getTotalUsersCount(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            followingInProgress: getFollowingInProgress(state),
            portionSize: getPortionSize(state),
        }
    }
;

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {
            follow: userFollowThunkCreator,
            unfollow: userUnfollowThunkCreator,
            getUsersThunkCreator: getUsersThunkCreator,
        }
    )
)(UsersContainer);