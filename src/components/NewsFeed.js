import React from 'react';
import { Feed, Header, Grid, Label, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../assets/style.css';
import {connect} from "react-redux";
import { getNews } from "../redux/actions/actions";
import { Link } from "react-router-dom";

let ISOConvert = require('iso8601-convert');



class NewsFeed extends React.PureComponent {

    componentDidMount() {
        this.props.getNews('GET_NEWS');
    }

    render() {
        return <div className="news-feed">
            <Grid centered columns={2}>
                <Grid.Column>
                    <Feed>
                        {this.props.news.map(newsitem => {
                            let convertedDate = ISOConvert.toDate(newsitem.date).toUTCString().replace(' GMT', '');
                            return <Feed.Event key={newsitem.date}>
                                        <Feed.Label>
                                            <Image src={newsitem.author.imagePath} avatar />
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <Link to={"/users/profile/" + newsitem.author._id}>{newsitem.author.firstName} {newsitem.author.lastName}</Link> posted on his page
                                                <Feed.Date>{convertedDate}</Feed.Date>
                                            </Feed.Summary>
                                            <Header className="word-break" as='h3'>{newsitem.title}</Header>
                                            <Feed.Extra text>
                                                <Image className="" src={newsitem.filePath} size='small' rounded floated='left' />
                                                {newsitem.text}
                                            </Feed.Extra>
                                            <Feed.Meta>
                                                {
                                                    newsitem.tags.trim() !== "" ?
                                                        <Label as='a' tag >Tags: {newsitem.tags}</Label>
                                                    :null
                                                }
                                            </Feed.Meta>
                                        </Feed.Content>
                                    </Feed.Event>
                        })
                        }
                    </Feed>
                </Grid.Column>
            </Grid>
        </div>
    }
}

const mapStateToProps = state => ({
    news: state.getNews.news,
});

const mapDispatchToProps = dispatch =>({
    getNews: (action) => dispatch(getNews(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);