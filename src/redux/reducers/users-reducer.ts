import {UserType} from "../../components/Users/UsersContainer";

// Const action
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PATE = 'SET_CURRENT_PATE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHINGT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

// Action type
type FollowActionType = {
    type: typeof FOLLOW
    userID: number
}
type UnFollowActionType = {
    type: typeof UNFOLLOW
    userID: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PATE
    pageNumber: number
}
type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}
type setIsFetchingType = {
    type: typeof TOOGLE_IS_FETCHING
    isFetching: boolean
}
type SetIsFollowingProgress = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
type ActionsType =
    FollowActionType
    | UnFollowActionType
    | SetUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | setIsFetchingType
    | SetIsFollowingProgress

// Init
export type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
const initialState: initialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }
        }
        case SET_USERS: {
            return {...state, users: action.users};
        }
        case SET_CURRENT_PATE: {
            return {
                ...state,
                currentPage: action.pageNumber,
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.usersCount > 50 ? 50 : action.usersCount,
            }
        }
        case TOOGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        }
        default: {
            return state;
        }
    }
}

// Action creator
export const follow = (userID: number): FollowActionType => ({type: FOLLOW, userID});
export const unFollow = (userID: number): UnFollowActionType => ({type: UNFOLLOW, userID});
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber: number): setCurrentPageType => ({type: SET_CURRENT_PATE, pageNumber});
export const setTotalUsersCount = (usersCount: number): setTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    usersCount
});
export const setIsFetching = (isFetching: boolean): setIsFetchingType => ({type: TOOGLE_IS_FETCHING, isFetching});
export const setIsFollowingProgress = (isFetching: boolean, userId: number): SetIsFollowingProgress => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
})