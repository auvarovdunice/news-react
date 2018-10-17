let initialState = {
    user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        _id: '',
        imagePath: '',
    },
    isLogged: false
};

const userJSON = localStorage.getItem('user');
if(userJSON) {
    initialState = JSON.parse(userJSON);
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOG_SUCCEEDED':
            const newState = {
                ...state,
                isLogged: true,
                user: action.user,
            };
            localStorage['user'] = JSON.stringify(newState);
            return newState;
        case 'USER_LOG_FAILED':
            alert("Пользователь не зарегистрирован");
            return {
                message: action.message,
                ...state,
                user: {
                    ...state.user,
                    username: '',
                    password: '',
                }
            };
        case 'GOOGLE_SIGN_IN_SUCCEEDED':
            return {
                ...state,
                isLogged: true,
            };
        case 'LOGOUT_SUCCEEDED':
            localStorage.removeItem('user');
            return {
                user: {
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    _id: '',
                },
                isLogged: false,
            };
        case 'ISLOGIN_SUCCEEDED':
            return {
                ...state,
                isLogged: action.isLogged,
            };
        case 'SAVE_CHANGES_SUCCEEDED':
            const changedState = {
                ...state,
                isLogged: true,
                user: action.changes,
            };
            localStorage['user'] = JSON.stringify(changedState);
            return changedState;
        case 'GOOGLE_GET_USER_SUCCEEDED':
            const googleState = {
                ...state,
                isLogged: true,
                user: action.user,
            };
            localStorage['user'] = JSON.stringify(googleState);
            return googleState;
        case 'CHANGE_PROFILE_IMAGE_SUCCEEDED':
            let local = JSON.parse(localStorage.getItem('user'));
            local.user.imagePath = action.newImage.imagePath;
            localStorage.setItem('user', JSON.stringify(local));
            return {
               ...state,
                user: {
                   ...state.user,
                    imagePath: action.newImage.imagePath
               }
            };
        case 'GET_USER_BY_ID_SUCCEEDED':
            return {
                ...state,
                otherUser: action.user,
            };
        default:
            return state;
    }
}

