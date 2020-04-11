import React from 'react';
import validator from 'email-validator';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isSubmitDisabled = () => {
    const { email, password, firstName, lastName, confirmPassword } = this.state;
    return (
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      password === '' ||
      confirmPassword !== password ||
      !validator.validate(email)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { email, password, firstName, lastName } = this.state;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    axios
      .post('https://mcr-codes-image-sharing-api.herokuapp.com/users', formData)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { errorMessage, email, password, confirmPassword, firstName, lastName } = this.state;

    return (
      <form className="log-in-form" onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <div>
          <label htmlFor="email">
            First Name
            <input
              type="text"
              className="input-field"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            Last Name
            <input
              type="text"
              className="input-field"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="input-field"
              name="email"
              value={email}
              placeholder="example@example.com"
              onChange={this.handleChange}
              required
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
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            Confirm Password
            <input
              type="password"
              className="input-field"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={this.handleChange}
              required
            />
          </label>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
        <button disabled={this.isSubmitDisabled()} type="submit">
          Register
        </button>
        {' or '}
        <div>
          <Link to="/">Log In</Link>
        </div>
      </form>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Register;
