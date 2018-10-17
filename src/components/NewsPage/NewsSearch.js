import React from 'react';
import '../../assets/style.css';
import { Dropdown, Input, Grid } from 'semantic-ui-react';
import { filterNewsByTitle, filterNewsByAuthor, filterNewsByContent, filterNewsByAllFields } from "../../redux/actions/actions";
import {connect} from "react-redux";

const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'title', text: 'Titles', value: 'title' },
    { key: 'text', text: 'Content', value: 'text' },
    { key: 'author', text: 'Authors', value: 'author' },
];

class NewsSearch extends React.PureComponent {
    state = {
        value: '',
        type: 'all'
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        switch(this.state.type) {
            case "title": {
                this.props.filterNewsByTitle(e.target.value);
                break
            }
            case "author": {
                this.props.filterNewsByAuthor(e.target.value);
                break
            }
            case "text": {
                this.props.filterNewsByContent(e.target.value);
                break
            }
            case "all": {
                this.props.filterNewsByAllFields(e.target.value);
                break
            }
            default: {
                break
            }
        }
    };

    changeTypeOfFind = (event, data) => {
        this.setState({
            type: data.value,
        })

    };

    render() {
        return <Grid centered columns={2}>
            <Grid.Column>
                <Input
                    action={<Dropdown button
                                      basic
                                      options={options}
                                      onChange={this.changeTypeOfFind}
                                      floating
                                      defaultValue={this.state.type} />}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search...'
                    fluid
                    className="news-search"
                    onChange={this.handleChange.bind()}
                    value={this.state.value}
                />
            </Grid.Column>
            </Grid>
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>({
    filterNewsByTitle: (action) => dispatch(filterNewsByTitle(action)),
    filterNewsByAuthor:(action) => dispatch(filterNewsByAuthor(action)),
    filterNewsByContent: (action) => dispatch(filterNewsByContent(action)),
    filterNewsByAllFields: (action) => dispatch(filterNewsByAllFields(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSearch);