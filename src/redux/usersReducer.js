const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 5,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map((u) => {
                    debugger;
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

export const setUserActionCreator = (users) => {
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