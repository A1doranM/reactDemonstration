import {createSelector} from "reselect";
import {AppStateType} from "../redux_store";
import {UserType} from "../../types/types";

const getUsers = (state: AppStateType) => {
    return state.usersPage.users
};

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
};

export const getUsersSelector = createSelector(getUsers,
    (users: Array<UserType>) => {
        return users.filter(u => true);
    });
