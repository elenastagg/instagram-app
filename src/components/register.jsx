import React from 'react';
import validator from 'email-validator';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isSubmitDisabled() {
    const { email, password, firstName, lastName } = this.state;
    return email === '' || password === '' || firstName === '' || lastName === '' || !validator.validate(email);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = this.state;
    axios.post('https://mcr-codes-image-sharing-api.herokuapp.com/users', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }
    ).then(response => {
      console.log('registration res', response)
      this.props.history.push('/profile');
    }).catch(error => {
      console.log('registration error', error);
    })
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, password, confirmPassword, firstName, lastName } = this.state;

    return (
      <form className="log-in-form" onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>
            First Name
            <input
              type="text"
              className="input-field"
              name="firstName"
              value={firstName}
              onChange={this.handleFieldChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Last Name
            <input
              type="text"
              className="input-field"
              name="lastName"
              value={lastName}
              onChange={this.handleFieldChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email
            <input
              type="email"
              className="input-field"
              name="email"
              value={email}
              placeholder="example@example.com"
              onChange={this.handleFieldChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              className="input-field"
              name="password"
              value={password}
              placeholder="Type in a password"
              onChange={this.handleFieldChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Confirm Password
            <input
              type="password"
              className="input-field"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={this.handleFieldChange}
              required
            />
          </label>
        </div>

        <button
          disabled={this.isSubmitDisabled()}
          type="submit"
        >
          Register
        </button>
      </form>
    );
  }
}

export default Register;
