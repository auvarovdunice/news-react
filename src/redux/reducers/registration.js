let initialState = {
    user: {
        username: '',
        password: ''
    },
    isLogged: false,
};

const userJSON = localStorage.getItem('user');
if(userJSON) {
    initialState = JSON.parse(userJSON);
}

export default function registration(state = initialState, action) {
    switch (action.type) {
        case 'USER_REG_SUCCEEDED':
            const newState = {
                ...state,
                user: action.user,
            };
            localStorage['user'] = JSON.stringify(newState);
            return newState;
        case 'USER_REG_FAILED':
            alert("Данный пользователь уже зарегистирирован");
            return {
                message: action.message,
                ...state,
                user: {
                    ...state.user,
                    username: '',
                    password: ''
                }
            };
        default:
            return state;
    }
}