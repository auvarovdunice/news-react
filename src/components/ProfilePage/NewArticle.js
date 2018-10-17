import React from 'react';
import '../../assets/style.css';
import { Grid, Form, Button, Input, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import {createPost} from "../../redux/actions/actions";

class NewArticle extends React.PureComponent {

    constructor(props) {
        super(props);
        this.file = React.createRef();
        this.state = {
            title: "",
            content: "",
            tags: "",
            file: null,
            path: ""
        };
        this.baseState = this.state;
    }


    handleChange = (type, event) => {
        this.setState({
            [type]: event.target.value,
        });
    };

    onChangeFile = e => {
        this.setState({
            ...this.state,
            file: e.target.files[0],
            path: e.target.value || '',
        })
    };

    onClickUpload = e => {
        this.file.current.click();
    };

    validateForm = () => {
        const { title, content, tags, file } = this.state;
        const userId = this.props.userId;
        if (title.trim() === "" || content.trim() === "") {
            alert("Заполните обязательные поля: Title и Content");
            this.setState(this.baseState)
        } else {
            this.props.createPost({ title, content, tags, file, userId});
            this.setState(this.baseState)
        }
    };

    render() {

        const { title, content, tags } = this.state;
        return <Grid.Column width={12}>
                <Form>
                    <Form.Field>
                        <Form.Input value={title} onChange={this.handleChange.bind(this, 'title')} placeholder='Title' />
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea value={content} onChange={this.handleChange.bind(this, 'content')} placeholder='Type content...' />
                    </Form.Field>
                    <Form.Field>
                        <Input value={tags} onChange={this.handleChange.bind(this, 'tags')} iconPosition='left' placeholder='Type tags...' >
                            <Icon name="tags"/>
                            <input />
                        </Input>
                    </Form.Field>
                    <Button onClick={this.onClickUpload} type="file" floated="left" icon='file image' content='Upload image' />
                    <input onChange={this.onChangeFile} type="file" name="file" className="hidden" ref={this.file}/>
                    <Input placeholder={this.state.path} />
                    <Button onClick={this.validateForm} type="submit" floated="right" positive>Publish</Button>
                </Form>
            </Grid.Column>
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user._id
});

const mapDispatchToProps = dispatch =>({
    createPost: payload => dispatch(createPost(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);