import {usersAPI} from "../components/API/API";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FETCHING = 'SET_FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [],
};


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map((u) => {
                    if (u.id === action.userID) {
                        return {
                            ...u,
                            followed: true,
                        }
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map((u) => {
                    if (u.id === action.userID) {
                        return {
                            ...u,
                            followed: false,
                        }
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber,
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetchingValue,
            };
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.fetchingValue
                    ? [...state.followingInProgress, action.userID]
                    : [...state.followingInProgress.filter(id => id !== action.userID)],
            };
        default:
            return state;
    }
};

export const followActionCreator = (userID) => {
    return {
        type: FOLLOW,
        userID: userID,
    }
};

export const unfollowActionCreator = (userID) => {
    return {
        type: UNFOLLOW,
        userID: userID,
    }
};

export const setUsersActionCreator = (users) => {
    return {
        type: SET_USERS,
        users: users,
    }
};

export const setCurrentPageActionCreator = (pageNumber) => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber: pageNumber,
    }
};

export const setUsersTotalCountActionCreator = (usersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: usersCount,
    }
};

export const setFetchingActionCreator = (fetchingValue) => {
    return {
        type: SET_FETCHING,
        fetchingValue: fetchingValue,
    }
};

export const followingInProgressActionCreator = (fetchingValue, userID) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        fetchingValue: fetchingValue,
        userID: userID,
    }
};

export const getUsersThunkCreator = (page, pageSize) => {
    return (dispatch) => {

        dispatch(setFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(page));

        usersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(setUsersActionCreator(data.items));
                dispatch(setUsersTotalCountActionCreator(data.totalCount));
                dispatch(setFetchingActionCreator(false))
            });
    };
};

export const userFollowThunkCreator = (userID) => {
    return (dispatch) => {
        dispatch(followingInProgressActionCreator(true, userID));

        usersAPI.userFollow(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followActionCreator(userID));
                }
                dispatch(followingInProgressActionCreator(false, userID))
            });
    }
};

export const userUnfollowThunkCreator = (userID) => {
    return (dispatch) => {
        dispatch(followingInProgressActionCreator(true, userID));

        usersAPI.userUnfollow(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowActionCreator(userID));
                }
                dispatch(followingInProgressActionCreator(false, userID))
            });
    }
};