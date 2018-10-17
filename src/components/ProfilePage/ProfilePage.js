import React from 'react';
import '../../assets/style.css';
import UserInfo from './UserInfo';
import MainHeader from '../MainHeader';
import NewArticle from './NewArticle';
import UserFeed from './UserFeed';
import OtherUserInfo from './OtherUserInfo';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { getNewsByUser, getUserById } from "../../redux/actions/actions";
import {connect} from "react-redux";


class ProfilePage extends React.PureComponent {

    state = {
        isMe: false,
    };

    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.props.getNewsByUser(this.props.match.params.id);
        this.props.getUserById(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.props.otherUser) {
            // console.log('otherUser',this.props.otherUser._id);
            // console.log('User',this.props.user._id);

            if (this.props.otherUser._id === this.props.user._id) {
                // console.log("Совпадение");
                this.setState({
                    isMe: true,
                });
            } else {
                this.setState({
                    isMe: false,
                });
            }
        }
    }

    render() {
        return <div>
            <MainHeader />
                {
                    this.state.isMe ? (
                        <Grid>
                            <UserInfo />
                            <NewArticle />
                            <UserFeed />
                        </Grid>
                    ): (
                        <Grid>
                            <OtherUserInfo />
                            <UserFeed />
                        </Grid>
                    )
                }
        </div>
    }
}


const mapStateToProps = state => ({
    user: state.auth.user,
    otherUser: state.auth.otherUser
});

const mapDispatchToProps = dispatch =>({
    getNewsByUser: (action) => dispatch(getNewsByUser(action)),
    getUserById: (action) => dispatch(getUserById(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
