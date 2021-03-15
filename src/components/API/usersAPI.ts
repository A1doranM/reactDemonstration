import { GetItemsType, instance } from './API';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    userUnfollow(userID: number) {
        return instance.delete<ResponseType>(`follow/${userID}`)
            .then(response => {
                return response.data;
            });
    },
    userFollow(userID = 1) {
        return instance.post<ResponseType>(`follow/${userID}`, null)
            .then(response => {
                return response.data;
            });
    },
};