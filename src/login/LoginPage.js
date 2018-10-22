import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      userAuthenticated: this.Auth.userAuthenticated(),
      user: {
        email: null,
        password: null
      },
      error: null
    };
    this.changeUser = this.changeUser.bind(this);
    this.hasError = this.hasError.bind(this);
    this.processForm = this.processForm.bind(this);
    this.hasHelperText = this.hasHelperText.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.formError = this.formError.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value.trim();
    this.setState({
      user
    });

    if (this.state.error) {
      this.setState(() => ({
        error: null
      }));
    }
  }

  hasHelperText() {
    if (this.validateEmail()) {
      return 'Please enter a valid email.';
    }
  }

  hasError() {
    if (this.validateEmail() || this.state.error) {
      return true;
    }
  }

  validateEmail() {
    if (this.state.user.email) {
      var isValidEmail = this.state.user.email.match(
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      );
      if (isValidEmail) {
        return false;
      } else {
        return true;
      }
    }
  }

  formError(response) {
    this.setState(() => ({
      error: 'Email or password is incorrect.'
    }));
  }

  processForm(event) {
    event.preventDefault();
    const email = this.state.user.email;
    const password = this.state.user.password;
    if (email && password && !this.validateEmail()) {
      this.Auth.authenticateUser(email, password).then(response => {
        if (response && response.Token) {
          this.setState(() => ({
            userAuthenticated: true
          }));
        } else {
          this.formError(response);
        }
      });
    }
  }
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    };
    const { userAuthenticated } = this.state;
    if (userAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoginForm
          onChange={this.changeUser}
          user={this.state.user}
          hasError={this.hasError()}
          hasHelperText={this.hasHelperText()}
          onSubmit={this.processForm}
          validateEmail={this.validateEmail()}
          formError={this.state.error}
        />
      </div>
    );
  }
}

export default Login;
