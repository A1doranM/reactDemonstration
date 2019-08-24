const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    usersData: [
        {
            id: Math.floor(Math.random() * 1000000),
            photo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMzgxNWY4MjMtYTVhMy00MjAxLWEwM2QtZjVjNmZlODAzMmVlXkEyXkFqcGdeQXVyOTA0NDI1Mzg%40._V1_UY317_CR51%2C0%2C214%2C317_AL_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Fname%2Fnm9800159%2F&docid=2FIYAFOz6YB7YM&tbnid=IEplp4iIobdt0M%3A&vet=10ahUKEwixs_HdmJTkAhWL_qQKHcj3B8QQMwhPKAIwAg..i&w=214&h=317&bih=702&biw=726&q=alex&ved=0ahUKEwixs_HdmJTkAhWL_qQKHcj3B8QQMwhPKAIwAg&iact=mrc&uact=8',
            fallowed: false,
            name: 'Alex',
            status: 'First user',
            location: {city: 'Odessa', country: 'Ukraine'},

        },
        {
            id: Math.floor(Math.random() * 1000000),
            photo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.billboard.com%2Ffiles%2Fstyles%2Farticle_main_image%2Fpublic%2Fmedia%2FMAX-2018-cr-Jade-Ehlers-billboard-1548.jpg&imgrefurl=https%3A%2F%2Fwww.billboard.com%2Farticles%2Fcolumns%2Fpop%2F8457520%2Fmax-new-song-team-noah-cyrus-interview&docid=iaDx4nAYkqyb9M&tbnid=pM_Df7XOv6Zs2M%3A&vet=10ahUKEwjaueTymJTkAhVOC-wKHa5RBgwQMwhTKAAwAA..i&w=636&h=421&bih=702&biw=726&q=Max&ved=0ahUKEwjaueTymJTkAhVOC-wKHa5RBgwQMwhTKAAwAA&iact=mrc&uact=8',
            fallowed: true,
            name: 'Max',
            status: 'Second user',
            location: {city: 'NewYork', country: 'USA'},

        },
        {
            id: Math.floor(Math.random() * 1000000),
            photo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpmctvline2.files.wordpress.com%2F2018%2F06%2Fdara-reboot.jpg%3Fw%3D620&imgrefurl=https%3A%2F%2Ftvline.com%2F2018%2F06%2F21%2Fdaria-revival-reboot-mtv-studios%2F&docid=MC-DwcaYgNb0oM&tbnid=mEet1mYdIjJwvM%3A&vet=10ahUKEwj7r-2CmZTkAhUHyqQKHXsEDDwQMwhKKAAwAA..i&w=620&h=420&bih=702&biw=726&q=Daria&ved=0ahUKEwj7r-2CmZTkAhUHyqQKHXsEDDwQMwhKKAAwAA&iact=mrc&uact=8',
            fallowed: false,
            name: 'Daria',
            status: 'Third user',
            location: {city: 'Berlin', country: 'Germany'},

        },
    ],
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
                usersData: [...state.usersData, ...action.users]
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