import { call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';


function* logUser(action) {
    try {
        const user = yield call(axios, '/login', {method: 'POST', data: { username: action.username, password: action.password }});
        yield put({type: "USER_LOG_SUCCEEDED", user: user.data.user});
    } catch (e) {
        console.log(e.responseText);
        yield put({type: "USER_LOG_FAILED", message: e.message});
    }
}

function* googleLogin() {
    try {
        yield call(axios, '/auth/google', {method: 'GET'});
        yield put({type: "GOOGLE_SIGN_IN_SUCCEEDED"});
    } catch (e) {
        console.log(e.message);
    }
}

function* getNews() {
    try {
        const news = yield call(axios, '/get-feed', {method: 'GET'});
        yield put({type: "GET_NEWS_SUCCEEDED", news: news.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* getNewsByUser(action) {
    try {
        const news = yield call(axios, '/user-feed/' + action.id, {method: 'GET'});
        yield put({type: "GET_NEWS_BY_USER_SUCCEEDED", news: news.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* filterNewsByTitle(action) {
    try {
        const news = yield call(axios, '/feed/title', {method: 'GET', params: {value: action.value}});
        yield put({type: "FILTER_NEWS_BY_TITLE_SUCCEEDED", news: news.data});
        console.log(news.data)
    } catch (e) {
        console.log(e.message);
    }
}

function* filterNewsByAuthor(action) {
    try {
        const news = yield call(axios, '/feed/author', {method: 'GET', params: {value: action.value}});
        yield put({type: "FILTER_NEWS_BY_AUTHOR_SUCCEEDED", news: news.data});
        console.log(news.data);
    } catch (e) {
        console.log(e.message);
    }
}

function* filterNewsByContent(action) {
    try {
        const news = yield call(axios, '/feed/content', {method: 'GET', params: {value: action.value}});
        yield put({type: "FILTER_NEWS_BY_CONTENT_SUCCEEDED", news: news.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* filterNewsByAllFields(action) {
    try {
        const news = yield call(axios, '/feed/all', {method: 'GET', params: {value: action.value}});
        yield put({type: "FILTER_NEWS_BY_ALL_SUCCEEDED", news: news.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* logOut() {
    try {
        yield call(axios, '/logout', {method: 'GET'});
        yield put({type: "LOGOUT_SUCCEEDED"});
    } catch (e) {
        console.log(e.message);
    }
}

function* regUser(action) {
    try {
        const newUser = yield call(axios, '/register', {method: 'POST', data: action.payload });
        yield put({type: "USER_REG_SUCCEEDED", user: newUser.data});
        yield put({type: "USER_LOG_SUCCEEDED", user: newUser.data});
    } catch (e) {
        yield put({type: "USER_REG_FAILED", message: e.message});
    }
}

function* getUserById(action) {
    try {
        const user = yield call(axios, '/getuser/' + action.id, {method: 'GET'});
        yield put({type: "GET_USER_BY_ID_SUCCEEDED", user: user.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* saveProfileChanges(action) {
    try {
        const newChanges = yield call(axios, '/userinfo/'+ action.payload.id, {method: 'PATCH', data: action.payload });
        yield put({type: "SAVE_CHANGES_SUCCEEDED", changes: newChanges.data});
    } catch (e) {
        yield put({type: "SAVE_CHANGES_FAILED", message: e.message});
    }
}

function* isLogin() {
    try {
        const isLogged = yield call(axios, '/islogin', {method: 'GET'});
        yield put({type: "ISLOGIN_SUCCEEDED", isLogged: isLogged.data});
    } catch (e) {
        console.log(e.message);
    }
}

function* getGoogleUser() {
    try {
        const user = yield call(axios, '/getuser', {method: 'GET'});
        yield put({type: "GOOGLE_GET_USER_SUCCEEDED", user: user.data});
    } catch (e) {
        console.log(e.message);
    }
}


function* createPost(action) {
    try {
        const formData = new FormData();
        formData.append('title', action.payload.title);
        formData.append('content', action.payload.content);
        formData.append('author', action.payload.userId);
        formData.append('file', action.payload.file);
        formData.append('tags', action.payload.tags);
        const post = yield call(axios, '/newpost', {method: 'POST', data: formData });
        yield put({type: "POST_CREATE_SUCCEEDED", post: post.data});
    } catch (e) {
        yield put({type: "POST_CREATE_FAILED", message: e.message});
    }
}

function* changeProfileImage(action) {
    try {
        const formData = new FormData();
        formData.append('imagePath', action.newImagePath);
        const newProfileImage = yield call(axios, '/change-pi/'+action.id, {method: 'PATCH', data: formData });
        yield put({type: "CHANGE_PROFILE_IMAGE_SUCCEEDED", newImage: newProfileImage.data});
    } catch (e) {
        yield put({type: "CHANGE_PROFILE_IMAGE_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeEvery("LOG_IN_REQUESTED", logUser);
    yield takeEvery("SIGN_UP_REQUESTED", regUser);
    yield takeEvery("GOOGLE_SIGN_IN_REQUESTED", googleLogin);
    yield takeEvery("GET_NEWS_REQUESTED", getNews);
    yield takeEvery("FILTER_NEWS_BY_TITLE_REQUESTED", filterNewsByTitle);
    yield takeEvery("FILTER_NEWS_BY_AUTHOR_REQUESTED", filterNewsByAuthor);
    yield takeEvery("FILTER_NEWS_BY_CONTENT_REQUESTED", filterNewsByContent);
    yield takeEvery("FILTER_NEWS_BY_ALL_REQUESTED", filterNewsByAllFields);
    yield takeEvery("LOGOUT_REQUESTED", logOut);
    yield takeEvery("ISLOGIN_REQUESTED", isLogin);
    yield takeEvery("SAVE_CHANGES_REQUESTED", saveProfileChanges);
    yield takeEvery("GOOGLE_GET_USER_REQUESTED", getGoogleUser);
    yield takeEvery("CREATE_POST", createPost);
    yield takeEvery("CHANGE_PROFILE_IMAGE", changeProfileImage);
    yield takeEvery("GET_NEWS_BY_USER_REQUESTED", getNewsByUser);
    yield takeEvery("GET_USER_BY_ID_REQUESTED", getUserById);
}

export default mySaga;
