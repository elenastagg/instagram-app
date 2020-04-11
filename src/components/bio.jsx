import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    const token = TokenManager.getToken();
    axios
      .get(`https://mcr-codes-image-sharing-api.herokuapp.com/me`, {
        headers: { Authorization: token },
      })
      .then(response => {
        const { email, firstName, lastName, bio, ...user } = response.data;
        this.setState({
          user,
          bio,
          firstName,
          lastName,
          email,
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
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

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const token = TokenManager.getToken();
    const { email, firstName, lastName, bio, avatar } = this.state;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('avatar', avatar);
    axios
      .patch('https://mcr-codes-image-sharing-api.herokuapp.com/me', formData, {
        headers: { Authorization: token },
      })
      .then(() => {
        history.push(`/profile/${TokenManager.getTokenPayLoad()._id}`);
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { avatar, email, bio, firstName, lastName, errorMessage } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="Last Name">
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
          <label htmlFor="Bio">
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
          <label htmlFor="Avatar">
            Upload your Avatar
            <input type="file" name="avatar" onChange={this.handleSelectImage} file={avatar} />
          </label>
        </div>
        <div>{errorMessage && <div>{errorMessage}</div>}</div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

Bio.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Bio;
