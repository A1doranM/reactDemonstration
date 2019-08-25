const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING = 'SET_FETCHING';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            };
        case SET_FETCHING:
            return{
                ...state,
                isFetching: action.fetchingValue,
            };
        default:
            return state;
    }
};

export const setUserDataActionCreator = (userID, email, login) => {
    return {
        type: SET_USER_DATA,
        data: {userID, email, login},
    }
};

export const setFetchingActionCreator = (fetchingValue) => {
    return {
        type: SET_FETCHING,
        fetchingValue: fetchingValue,
    }
};