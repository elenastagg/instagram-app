import React from 'react';
import validator from 'email-validator';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onLogin, history } = this.props;
    axios
      .post('https://mcr-codes-image-sharing-api.herokuapp.com/auth/login', {
        email,
        password,
      })
      .then(response => {
        TokenManager.setToken(response.data.token);
        onLogin();
        history.push(`/profile/${TokenManager.getTokenPayLoad()._id}`);
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  isSubmitDisabled = () => {
    const { email, password } = this.state;
    return email === '' || password === '' || !validator.validate(email);
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <form className="log-in-form" onSubmit={this.handleSubmit}>
        <h1>Log In</h1>
        <div>
          <div>Please log in to access your profile</div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              className="input-field"
              name="email"
              value={email}
              placeholder="example@example.com"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Password
            <input
              type="password"
              className="input-field"
              name="password"
              value={password}
              placeholder="Type in a password"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button disabled={this.isSubmitDisabled()} type="submit">
          Log In
        </button>
        {' or '}
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
      </form>
    );
  }
}

LogIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LogIn;
