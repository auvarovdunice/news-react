import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import '../../assets/style.css';
import 'semantic-ui-css/semantic.min.css';
import {connect} from "react-redux";
import { saveProfileChanges, changeProfileImage } from "../../redux/actions/actions";

class OtherUserInfo extends React.PureComponent {

    // state = {
    //     email: this.props.otherUser.email || "",
    //     firstName: this.props.otherUser.firstName || "",
    //     lastName: this.props.otherUser.lastName || "",
    //     imagePath: this.props.otherUser.imagePath || "",
    // };


    render() {
        // const { email, firstName, lastName } = this.state;
        return (
            <Grid.Column width={4} className="left floated">

                    {
                        this.props.otherUser ? (
                            <Card>
                                <Image className="hover-block" src={this.props.otherUser.imagePath}/>
                                <Card.Content>
                                    <Card.Header>{this.props.otherUser.firstName} {this.props.otherUser.lastName}</Card.Header>
                                    <Card.Meta>{this.props.otherUser.email}</Card.Meta>
                                </Card.Content>
                            </Card>
                        ) : null
                    }

            </Grid.Column>
        )
    }
}

const mapStateToProps = state => ({
    otherUser: state.auth.otherUser,
    // imagePath: state.auth.otherUser.imagePath
});

const mapDispatchToProps = dispatch =>({
    saveProfileChanges: (payload) => dispatch(saveProfileChanges(payload)),
    changeProfileImage: (newImagePath, id) => dispatch(changeProfileImage(newImagePath, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserInfo);