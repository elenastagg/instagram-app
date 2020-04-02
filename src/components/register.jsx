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
      bio: '',
      avatar: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSelectImage = event => {
    event.preventDefault();
    this.setState({
      avatar: event.target.files[0],
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isSubmitDisabled = () => {
    const { email, password, firstName, lastName, confirmPassword } = this.state;
    return (
      email === '' ||
      password === '' ||
      confirmPassword !== password ||
      firstName === '' ||
      lastName === '' ||
      !validator.validate(email)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { email, password, firstName, lastName, bio, avatar } = this.state;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('avatar', avatar);
    formData.append('password', password);
    axios
      .post('https://mcr-codes-image-sharing-api.herokuapp.com/users', formData)
      .then(response => {
        console.log('registration res', response);
        history.push('/');
      })
      .catch(error => {
        console.log('registration error', error);
      });
  };

  render() {
    const { email, password, confirmPassword, firstName, lastName, bio, avatar } = this.state;

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
            Bio
            <textarea
              maxLength="2200"
              name="bio"
              placeholder="Enter bio here..."
              value={bio}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor='email'>
            Upload your Avatar
            <input type="file" name="avatar" onChange={this.handleSelectImage} file={avatar} />
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
