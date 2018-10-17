export const LOG_IN_REQUESTED = 'LOG_IN_REQUESTED';
export const SIGN_UP_REQUESTED = 'SIGN_UP_REQUESTED';
export const GOOGLE_SIGN_IN_REQUESTED = 'GOOGLE_SIGN_IN_REQUESTED';
export const GET_NEWS_REQUESTED = 'GET_NEWS_REQUESTED';
export const GET_NEWS_BY_USER_REQUESTED = "GET_NEWS_BY_USER_REQUESTED";
export const FILTER_NEWS_BY_TITLE_REQUESTED = "FILTER_NEWS_BY_TITLE_REQUESTED";
export const FILTER_NEWS_BY_AUTHOR_REQUESTED = "FILTER_NEWS_BY_AUTHOR_REQUESTED";
export const FILTER_NEWS_BY_CONTENT_REQUESTED = "FILTER_NEWS_BY_CONTENT_REQUESTED";
export const FILTER_NEWS_BY_ALL_REQUESTED = "FILTER_NEWS_BY_ALL_REQUESTED";
export const LOGOUT_REQUESTED = "LOGOUT_REQUESTED";
export const ISLOGIN_REQUESTED = "ISLOGIN_REQUESTED";
export const SAVE_CHANGES_REQUESTED = "SAVE_CHANGES_REQUESTED";
export const GOOGLE_GET_USER_REQUESTED = "GOOGLE_GET_USER_REQUESTED";
export const CREATE_POST = "CREATE_POST";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const GET_USER_BY_ID_REQUESTED = "GET_USER_BY_ID_REQUESTED";




export function logIn(username, password) {
    return {
        type: LOG_IN_REQUESTED,
        username,
        password,
    };
}

export function signUp(payload) {
    return {
        type: SIGN_UP_REQUESTED,
        payload,
    };
}

export function googleLogin() {
    return {
        type: GOOGLE_SIGN_IN_REQUESTED,
    };
}

export function getNews() {
    return {
        type: GET_NEWS_REQUESTED,
    };
}

export function getUserById(id) {
    return {
        type: GET_USER_BY_ID_REQUESTED,
        id
    };
}

export function getNewsByUser(id) {
    return {
        type: GET_NEWS_BY_USER_REQUESTED,
        id
    };
}

export function filterNewsByTitle(value) {
    return {
        type: FILTER_NEWS_BY_TITLE_REQUESTED,
        value
    };
}

export function filterNewsByAuthor(value) {
    return {
        type: FILTER_NEWS_BY_AUTHOR_REQUESTED,
        value
    };
}

export function filterNewsByContent(value) {
    return {
        type: FILTER_NEWS_BY_CONTENT_REQUESTED,
        value
    };
}

export function filterNewsByAllFields(value) {
    return {
        type: FILTER_NEWS_BY_ALL_REQUESTED,
        value
    };
}

export function logOut() {
    return {
        type: LOGOUT_REQUESTED,
    };
}


export function isLogin() {
    return {
        type: ISLOGIN_REQUESTED,
    }
}

export function saveProfileChanges(payload) {
    return {
        type: SAVE_CHANGES_REQUESTED,
        payload
    }
}

export function getGoogleUser() {
    return {
        type: GOOGLE_GET_USER_REQUESTED,
    };
}

export function createPost(payload) {
    // console.log(payload);
    return {
        type: CREATE_POST,
        payload
    }
}

export function changeProfileImage(newImagePath, id) {
    // console.log(newImagePath);
    return {
        type: CHANGE_PROFILE_IMAGE,
        newImagePath,
        id
    }
}


