import React, { alert } from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      console.log(this.state);
    }
  }

  render() {
    const { email, password, confirmPassword, username } = this.state;

    return (
      <div className="log-in-form">
        <div label="Email" name="email">
          <input
            type="text"
            className="input-field"
            name="email"
            value={email}
            placeholder="example@example.com"
            onChange={this.handleFieldChange}
          />
        </div>

        <div label="Password" name="password">
          <input
            type="text"
            className="input-field"
            name="password"
            value={password}
            placeholder="Type in a password"
            onChange={this.handleFieldChange}
          />
        </div>

        <div label="Password" name="confirmPassword">
          <input
            type="text"
            className="input-field"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={this.handleFieldChange}
          />
        </div>

        <div label="Username" name="username">
          <input
            type="text"
            className="input-field"
            name="username"
            value={username}
            placeholder="Give your profile a username"
            onChange={this.handleFieldChange}
          />
        </div>

        <button onClick={() => this.handleSubmit()} type="submit">
          Register
        </button>
      </div>
    );
  }
}

export default Register;
