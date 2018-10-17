let initialState = {
    news: [],
};

export default function getNews(state = initialState, action) {
    switch (action.type) {
        case "GET_NEWS_SUCCEEDED" :
            // console.log(action.news);
            return {
                ...state,
                news: action.news
            };
        case "GET_NEWS_BY_USER_SUCCEEDED" :
            return {
                ...state,
                news: action.news
            };
        case "FILTER_NEWS_BY_TITLE_SUCCEEDED":
            return {
                ...state,
                news: action.news
            };
        case "FILTER_NEWS_BY_AUTHOR_SUCCEEDED":
            return {
                ...state,
                news: action.news
            };
        case "FILTER_NEWS_BY_CONTENT_SUCCEEDED":
            return {
                ...state,
                news: action.news
            };
        case "FILTER_NEWS_BY_ALL_SUCCEEDED":
            return {
                ...state,
                news: action.news
            };
        case "POST_CREATE_SUCCEEDED":
            return {
                ...state,
                news: action.post
            };
        default:
            return state;
    }
}