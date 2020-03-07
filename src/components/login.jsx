import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    const { email, password } = this.state;

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

        <button onClick={() => this.handleSubmit()} type="submit">
          Log In
        </button>
      </div>
    );
  }
}

export default LogIn;
