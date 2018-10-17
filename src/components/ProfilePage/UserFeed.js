import { Link } from "react-router-dom";
import React from 'react';
import { Feed, Header, Grid, Label, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../assets/style.css';
import {connect} from "react-redux";
import { getNewsByUser } from "../../redux/actions/actions";
let ISOConvert = require('iso8601-convert');



class UserFeed extends React.PureComponent {

    componentDidMount() {
        // console.log(this.props.match.params.id);
        let id = this.props.user._id;
        // this.props.getNewsByUser(id);
    }

    componentDidUpdate() {
        // console.log("Updated");
    }



    render() {
        return <Grid.Column width={12} className="right floated news-feed">
                        <Feed>
                            {this.props.news.map(newsitem => {
                                let convertedDate = ISOConvert.toDate(newsitem.date).toUTCString().replace(' GMT', '');
                                return <Feed.Event key={newsitem.date}>
                                    <Feed.Label>
                                        <Image src={newsitem.author.imagePath} avatar />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Link to={"#"}>{newsitem.author.firstName} {newsitem.author.lastName}</Link> posted on his page
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
    }
}

const mapStateToProps = state => ({
    news: state.getNews.news,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch =>({
    getNewsByUser: (action) => dispatch(getNewsByUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);