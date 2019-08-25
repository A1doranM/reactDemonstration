import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator, setFetchingActionCreator,
    setUserActionCreator, setUsersTotalCountActionCreator,
    unfollowActionCreator
} from "../../redux/usersReducer";
import * as axios from "axios/index";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.setFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${this.props.currentPage}
        &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                this.props.setFetching(false);
            });
    };

    onPageChanged = (pageNumber) => {
        this.props.setFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${pageNumber}
        &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setFetching(false);
            });
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
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: followActionCreator,
        unfollow: unfollowActionCreator,
        setUsers: setUserActionCreator,
        setCurrentPage: setCurrentPageActionCreator,
        setTotalUsersCount: setUsersTotalCountActionCreator,
        setFetching: setFetchingActionCreator,
    }
};

const UsersContainer = connect(mapStateToProps, {
    follow: followActionCreator,
    unfollow: unfollowActionCreator,
    setUsers: setUserActionCreator,
    setCurrentPage: setCurrentPageActionCreator,
    setTotalUsersCount: setUsersTotalCountActionCreator,
    setFetching: setFetchingActionCreator,
})(UsersAPIComponent);

export default UsersContainer;