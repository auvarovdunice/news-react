import React from 'react';
import '../../assets/style.css';
import NewsFeed from '../NewsFeed';
import NewsSearch from "./NewsSearch";
import MainHeader from "../../components/MainHeader";

class NewsPage extends React.PureComponent {

    render() {
        return <div>
            <MainHeader />
            <NewsSearch/>
            <NewsFeed />
        </div>
    }
}

export default NewsPage;