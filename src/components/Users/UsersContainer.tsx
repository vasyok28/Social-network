import { connect } from "react-redux";
import {
    follow,
    requestUsers,
    initialStateType,
    setCurrentPage, unFollow,
} from "../../redux/reducers/users-reducer";
import { AppStateType } from "../../redux/redux-store";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from "../../redux/reducers/selectors/user-selectors";

class UsersContainer extends React.Component<any, mapStateToPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <div className="content">
            {this.props.isFetching && <Preloader />}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress}
            />
        </div>
    }
}

// Dispatch type
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type mapStateToPropsType = initialStateType

// User type
type UserLocation = {
    country: string
    city: string
}
type UserPhoto = {
    large: string | null
    small: string | null
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: UserPhoto
    status: string | null
    followed?: boolean
    location?: UserLocation
}
export type UsersPropsType = mapDispatchToPropsType & mapStateToPropsType

// Dispatch connect
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


const mapDispatchToProps: mapDispatchToPropsType = {
    follow, unFollow, setCurrentPage, getUsers: requestUsers
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    // withAuthRedirect
)(UsersContainer);