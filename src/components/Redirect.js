import React from 'react';
import '../assets/style.css';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { getGoogleUser } from "../redux/actions/actions";


class googleRedirect extends React.PureComponent {

    render() {
        this.props.getGoogleUser();
        this.props.logIn();
        return <Redirect to="/feed"/>
    }
}

const mapDispatchToProps = dispatch =>({
    logIn: () => dispatch({type: 'GOOGLE_SIGN_IN_SUCCEEDED'}),
    getGoogleUser: () => dispatch(getGoogleUser())
});


export default connect(null, mapDispatchToProps)(googleRedirect);