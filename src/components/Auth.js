import React from 'react';
import '../assets/style.css';
import { connect } from 'react-redux';
import { logIn, signUp, googleLogin } from "../redux/actions/actions";
import googleIcon from '../../src/images/google-icon.png';

class Auth extends React.PureComponent {
    state = {
        formType: 'SIGN_IN',
        username: '',
        email: '',
        firstName: '',
        lastName:'',
        password: '',
        confirmPassword: '',
    };

    handleChange = (type, event) => {
        this.setState({
            [type]: event.target.value,
        });
    };

    handleFormType = (formType) => {
        this.setState({
            formType: formType,
        })
    };

    validateRegForm = () => {
        if (this.state.password === this.state.confirmPassword
            && this.state.username.trim() !== ""
            && this.state.email.trim() !== ""
            && this.state.password.trim() !== ""
            && this.state.firstName.trim() !== ""
            && this.state.lastName.trim() !== ""
        ) {
            const { username, email, firstName, lastName, password } = this.state;
            this.props.signUp({username, email, firstName, lastName, password});
        } else {
            alert('Заполните все поля!')}
    };

    validateLogForm =() => {
        if (this.state.username.trim() !== "" && this.state.password.trim() !== "") {
            this.props.logIn(this.state.username, this.state.password);
        } else {
            alert("Заполните оба поля: login, password");
        }
    };

    render() {
        const { username, password, confirmPassword, email, firstName, lastName } = this.state;
        return (
            <div>
                <div className="login-form">
                    {
                        (this.state.formType === 'SIGN_UP') ?
                        (
                            <form className="register-form">
                                <input type="text" value={username} onChange={this.handleChange.bind(this, 'username')} placeholder="Username"/>
                                <input type="text" value={email} onChange={this.handleChange.bind(this, 'email')} placeholder="Email"/>
                                <input type="text" value={firstName} onChange={this.handleChange.bind(this, 'firstName')} placeholder="First Name"/>
                                <input type="text" value={lastName} onChange={this.handleChange.bind(this, 'lastName')} placeholder="Last Name"/>
                                <input type="password" value={password} onChange={this.handleChange.bind(this, 'password')} placeholder="Password"/>
                                <input type="password" value={confirmPassword} onChange={this.handleChange.bind(this, 'confirmPassword')} placeholder="Confirm password"/>
                                <button type="submit" onClick={(e) => { e.preventDefault(); this.validateRegForm(); }}>create</button>
                                <p className="message">Already registered? <a onClick={() => this.handleFormType('SIGN_IN')} href="#">Sign In</a></p>
                            </form>
                        ) : (
                            <form>
                                <input type="text" value={username}
                                       onChange={this.handleChange.bind(this, 'username')}
                                       placeholder="Login"/>
                                <input type="password"
                                       value={password}
                                       onChange={this.handleChange.bind(this, 'password')}
                                       placeholder="Password"/>
                                <button onClick={ (e) => { e.preventDefault(); this.validateLogForm() } }>login</button>
                                <p className="message">Not registered?
                                    <a onClick={ () => this.handleFormType('SIGN_UP') }
                                       href="#"> Create an account </a>or authorize with
                                    <img src={googleIcon} alt="Google-icon" className="google-logo"/>
                                    <a onClick={this.props.googleLogin}
                                       href="/auth/google"> Google account</a>
                                </p>
                            </form>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>({
    logIn: (log, pass) => dispatch(logIn(log, pass)),
    signUp: payload => dispatch(signUp(payload)),
    googleLogin: () => dispatch(googleLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);