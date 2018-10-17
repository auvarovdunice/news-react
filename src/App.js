import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Auth from './components/Auth';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NewsPage from './components/NewsPage/NewsPage';
import googleRedirect from './components/Redirect';
import {connect} from 'react-redux';
import { isLogin } from "./redux/actions/actions";

class App extends Component {
    state = {
        id: ''
    };

    componentDidMount = () => {
        this.props.isLogin();
        if (Object.keys(this.props.user).length > 0) {
            this.setState({
                id: this.props.user._id
            })
        }
    };

  render() {
    return (
        <Container>
          <div className="App">
              <BrowserRouter>
                  <Switch>
                        <Route exact path="/" render={() => (
                            this.props.loggedIn ? (
                                <Redirect to="/feed"/>
                            ) : (
                                <Auth />
                                )
                        )}/>
                        <Route exact path={"/users/profile/:id"} component={ProfilePage} />
                        <Route exact path="/loginFromGoogle" component={googleRedirect} />
                        <Route exact path="/feed" component={NewsPage} />
                    </Switch>
              </BrowserRouter>
          </div>
        </Container>
    )
    }
}


const mapDispatchToProps = dispatch =>({
    isLogin: () => dispatch(isLogin()),
});

const mapStateToProps = state => ({
    loggedIn: state.auth.isLogged,
    user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
