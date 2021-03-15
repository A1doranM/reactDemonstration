import { Dispatch } from 'redux';
import { usersAPI } from '../components/API/usersAPI';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/ObjectHelper';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux_store';

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

export const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        // @ts-ignore
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: true }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        // @ts-ignore
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: false }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: [...action.users]
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.fetchingValue,
      };
    case "FOLLOWING_IN_PROGRESS":
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

export const actions = {
  followActionCreator: (userID: number) => {
    return {
      type: "FOLLOW",
      userID: userID,
    } as const
  },
  unfollowActionCreator: (userID: number) => {
    return {
      type: "UNFOLLOW",
      userID: userID,
    } as const
  },
  setUsersActionCreator: (users: Array<UserType>) => {
    return {
      type: "SET_USERS",
      users: users,
    } as const
  },
  setCurrentPageActionCreator: (pageNumber: number) => {
    return {
      type: "SET_CURRENT_PAGE",
      pageNumber: pageNumber,
    } as const
  },
  setUsersTotalCountActionCreator: (usersCount: number) => {
    return {
      type: "SET_TOTAL_USERS_COUNT",
      totalUsersCount: usersCount,
    } as const
  },
  setFetchingActionCreator: (fetchingValue: boolean) => {
    return {
      type: "SET_FETCHING",
      fetchingValue: fetchingValue,
    } as const
  },
  followingInProgressActionCreator: (fetchingValue: boolean, userID: number) => {
    return {
      type: "FOLLOWING_IN_PROGRESS",
      fetchingValue: fetchingValue,
      userID: userID,
    } as const
  },
};

type ActionTypes = InferActionsTypes<typeof actions>;

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
type ThunkType = BaseThunkType<ActionTypes>;

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.setFetchingActionCreator(true));
    dispatch(actions.setCurrentPageActionCreator(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.setUsersActionCreator(data.items));
    dispatch(actions.setUsersTotalCountActionCreator(data.totalCount));
    dispatch(actions.setFetchingActionCreator(false))
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userID: number,
  apiMethod: any,
  actionCreator: (userID: number) => ActionTypes
) => {
  dispatch(actions.followingInProgressActionCreator(true, userID));
  let response = await apiMethod(userID);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }

  dispatch(actions.followingInProgressActionCreator(false, userID))
};

export const userFollowThunkCreator = (userID: number): ThunkType => async (dispatch) => {
  let apiMethod = usersAPI.userFollow.bind(usersAPI);
  await _followUnfollowFlow(dispatch, userID, apiMethod, actions.followActionCreator);
};

export const userUnfollowThunkCreator = (userID: number): ThunkType => async (dispatch) => {
  let apiMethod = usersAPI.userUnfollow.bind(usersAPI);
  await _followUnfollowFlow(dispatch, userID, apiMethod, actions.unfollowActionCreator);
};