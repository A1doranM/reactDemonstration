import {usersAPI} from "../components/API/API";
import {updateObjectInArray} from "../utils/ObjectHelper";
import {UserType} from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_FETCHING = "SET_FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [] as Array<number>, //id of users ids
    portionSize: 10,
};

export type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // @ts-ignore
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true}),
            };
        case UNFOLLOW:
            return {
                ...state,
                // @ts-ignore
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false}),
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
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

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userID: number,
}

export const followActionCreator = (userID: number): FollowSuccessActionType => {
    return {
        type: FOLLOW,
        userID: userID,
    }
};

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userID: number,
}

export const unfollowActionCreator = (userID: number): UnfollowSuccessActionType => {
    return {
        type: UNFOLLOW,
        userID: userID,
    }
};

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>,
}

export const setUsersActionCreator = (users: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS,
        users: users,
    }
};

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    pageNumber: number,
}

export const setCurrentPageActionCreator = (pageNumber: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber: pageNumber,
    }
};

type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number,
}

export const setUsersTotalCountActionCreator = (usersCount: number): SetUsersTotalCountActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: usersCount,
    }
};

type SetFetchingActionType = {
    type: typeof SET_FETCHING,
    fetchingValue: boolean,
}

export const setFetchingActionCreator = (fetchingValue: boolean): SetFetchingActionType => {
    return {
        type: SET_FETCHING,
        fetchingValue: fetchingValue,
    }
};

type FollowingInProgressActionType = {
    type: typeof FOLLOWING_IN_PROGRESS,
    fetchingValue: boolean,
    userID: number,
}

export const followingInProgressActionCreator = (fetchingValue: boolean, userID: number): FollowingInProgressActionType => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        fetchingValue: fetchingValue,
        userID: userID,
    }
};

export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setFetchingActionCreator(true));
    dispatch(setCurrentPageActionCreator(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsersActionCreator(data.items));
    dispatch(setUsersTotalCountActionCreator(data.totalCount));
    dispatch(setFetchingActionCreator(false))
};

const FollowUnfollowFlow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(followingInProgressActionCreator(true, userID));
    let response = await apiMethod(userID);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }

    dispatch(followingInProgressActionCreator(false, userID))
};

export const userFollowThunkCreator = (userID: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.userFollow.bind(usersAPI);
    await FollowUnfollowFlow(dispatch, userID, apiMethod, followActionCreator);
};

export const userUnfollowThunkCreator = (userID: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.userUnfollow.bind(usersAPI);
    await FollowUnfollowFlow(dispatch, userID, apiMethod, unfollowActionCreator);

};