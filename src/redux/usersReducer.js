import {usersAPI} from "../components/API/API";
import {updateObjectInArray} from "../utils/ObjectHelper";

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
    portionSize: 10,
};


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.users, action.userID, "id", {followed: true}),
            };
        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.users, action.userID, "id", {followed: false}),
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

export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
    dispatch(setFetchingActionCreator(true));
    dispatch(setCurrentPageActionCreator(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsersActionCreator(data.items));
    dispatch(setUsersTotalCountActionCreator(data.totalCount));
    dispatch(setFetchingActionCreator(false))
};

const FollowUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(followingInProgressActionCreator(true, userID));
    let response = await apiMethod(userID);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }

    dispatch(followingInProgressActionCreator(false, userID))
};

export const userFollowThunkCreator = (userID) => async (dispatch) => {
    let apiMethod = usersAPI.userFollow.bind(usersAPI);
    await FollowUnfollowFlow(dispatch, userID, apiMethod, followActionCreator);
};

export const userUnfollowThunkCreator = (userID) => async (dispatch) => {
    let apiMethod = usersAPI.userUnfollow.bind(usersAPI);
    await FollowUnfollowFlow(dispatch, userID, apiMethod, unfollowActionCreator);

};