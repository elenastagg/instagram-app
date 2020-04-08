import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageCard from './image-card';
import '../styles/profile.scss';
import TokenManager from '../utils/token-manager';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      bio: '',
      avatar: '',
      user: null,
      images: [],
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    const token = TokenManager.getToken();
    axios
      .get(`https://mcr-codes-image-sharing-api.herokuapp.com/me`, {
        headers: { Authorization: token },
      })
      .then(response => {
        const { firstName, lastName, avatar, bio, images, ...user } = response.data;
        this.setState({
          images,
          user,
          bio,
          avatar,
          firstName,
          lastName,
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleComment = (id, comment) => {
    const { images } = this.state;
    this.setState({
      images: images.map(image => {
        if (image._id === id) {
          return {
            ...image,
            comments: image.comments.concat(comment),
          };
        }

        return image;
      }),
    });
  };

  handleDelete = id => {
    const token = TokenManager.getToken();
    axios
      .delete(`https://mcr-codes-image-sharing-api.herokuapp.com/images/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        const { images } = this.state;

        const isNotDeletedImage = image => image._id !== id;

        const notDeletedImages = images.filter(isNotDeletedImage);

        this.setState({
          images: notDeletedImages,
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  handleEdit = () => {
    const { history } = this.props;
    history.push('/bio');
  };

  render() {
    const { firstName, lastName, avatar, bio, images, errorMessage, user } = this.state;
    return (
      <Fragment>
        <div className="profile">
          <div className="profile-info-container">
            <div>
              <img className="profile-picture" alt="profile" src={avatar} />
            </div>
            <div className="info-container">
              <div>{`${firstName} ${lastName} `}</div>
              <div className="bio">{bio}</div>
              <div>
                <button type="button" onClick={this.handleEdit}>
                  Edit profile
                </button>
              </div>
            </div>
          </div>
          <div className="images-container">
            {errorMessage && <div>{errorMessage}</div>}
            {images.map(image => (
              <ImageCard
                key={image._id}
                user={user}
                image={image}
                onDelete={this.handleDelete}
                onComment={this.handleComment}
              />
            ))}
          </div>
          <div>
            <Link to="/upload">Upload Photo</Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
