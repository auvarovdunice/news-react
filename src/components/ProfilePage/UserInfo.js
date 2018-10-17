import React from 'react';
import { Grid, Card, Image, Button, Form, Input } from 'semantic-ui-react';
import '../../assets/style.css';
import 'semantic-ui-css/semantic.min.css';
import {connect} from "react-redux";
import { saveProfileChanges, changeProfileImage } from "../../redux/actions/actions";

class UserInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.file = React.createRef();
    }

    state = {
        isEditing: false,
        isDisabled: false,
        email: this.props.user.email || "",
        firstName: this.props.user.firstName || "",
        lastName: this.props.user.lastName || "",
        imagePath: this.props.user.imagePath || "",
        file: null,
        isMe: false,
    };

    startEditing = () => {
        this.setState({
            isEditing: true,
        })
    };

    saveChanges = () => {
        const { email, firstName, lastName } = this.state;
        let id = this.props.user._id;
        this.props.saveProfileChanges({ email, firstName, lastName, id});
        this.setState({
            user: this.props.user,
            isEditing: false,
        })
    };

    cancelChanges =() => {
        this.setState({
            isEditing: false,
        })
    };

    handleChange = (type, event) => {
        this.setState({
            [type]: event.target.value,
        }, () => {
            if (this.state.email.trim() === ""
                || this.state.firstName.trim() === ""
                || this.state.lastName.trim() === "") {
                this.setState({
                    isDisabled: true
                })
            }
            else {
                this.setState({
                    isDisabled: false
                })
            }
        });
    };

    onChangeFile = e => {
        let id = this.props.user._id;
        this.props.changeProfileImage(e.target.files[0], id);
        this.setState({
            ...this.state,
            file: e.target.files[0],
            imagePath: this.props.imagePath,
        })
    };

    onClickProfileImage = e => {
        this.file.current.click();
    };

    render() {
        const { email, firstName, lastName } = this.state;
        return (
                <Grid.Column width={4} className="left floated">
                    <Card>
                        <Image src={this.props.imagePath} onClick={this.onClickProfileImage}/>
                        <input onChange={this.onChangeFile} type="file" name="file" className="hidden" ref={this.file}/>
                        <Card.Content>
                            <Card.Header>{firstName} {lastName}</Card.Header>
                            <Card.Meta>{email}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            {this.state.isEditing === false ?
                            <Button basic
                                    color='green'
                                    content='Edit profile'
                                    onClick={this.startEditing}
                            /> : <Button basic
                                         color='red'
                                         content='Cancel changes'
                                         onClick={this.cancelChanges}
                                />
                            }
                        </Card.Content>
                        {this.state.isEditing === true ?
                            <Card.Content>
                                <Form>
                                    <Form.Field inline>
                                        <Input required value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')} placeholder='First Name'/>
                                    </Form.Field>
                                    <Form.Field inline>
                                        <Input required value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')} placeholder='Last Name'/>
                                    </Form.Field>
                                    <Form.Field inline>
                                        <Input required value={this.state.email} onChange={this.handleChange.bind(this, 'email')} placeholder='Email'/>
                                    </Form.Field>
                                    <Button type="button" disabled={this.state.isDisabled} positive onClick={this.saveChanges}>Save</Button>
                                </Form>
                            </Card.Content> : null
                        }
                    </Card>
                </Grid.Column>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    imagePath: state.auth.user.imagePath
});

const mapDispatchToProps = dispatch =>({
    saveProfileChanges: (payload) => dispatch(saveProfileChanges(payload)),
    changeProfileImage: (newImagePath, id) => dispatch(changeProfileImage(newImagePath, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);