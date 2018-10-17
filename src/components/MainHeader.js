import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import '../assets/style.css';
import { connect } from 'react-redux';
import { logOut } from "../redux/actions/actions";

class MainHeader extends React.PureComponent {

    render() {

        return (
            <Grid centered columns={1}>
                <Grid.Column>
                    <Segment clearing>
                        <Header as='h2' floated='left' color='green'>
                            <Link className="header-link" to="/feed">ДелайКрасиво</Link>
                        </Header>
                        {this.props.isLogged === true ?
                            <Header as='h4' floated='right' >
                                <div>
                                    {this.props.isLogged ? (
                                    <Link className="profile-link" to={"/users/profile/" + this.props.user._id}>{this.props.user.firstName} {this.props.user.lastName}</Link>
                                        ) : null
                                    }
                                </div>
                                <div className="logout">
                                    <Link to="/" onClick={ () => { this.props.logOut() } }>Logout</Link>
                                </div>
                            </Header>
                            : <Header as='h4' floated='right' >
                                <div className="logout">
                                    <Link to="/" >SignIn</Link>
                                </div>
                            </Header>
                        }
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch =>({
    logOut: () => dispatch(logOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));