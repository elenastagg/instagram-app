import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageCard from './image-card';
import '../styles/profile.scss';
import TokenManager from '../utils/token-manager';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      user: null,
      images: [],
    };
  }

  componentDidMount() {
    const token = TokenManager.getToken();
    axios
      .get(`https://mcr-codes-image-sharing-api.herokuapp.com/me`, {
        headers: { Authorization: token },
      })
      .then(response => {
        const { images, ...user } = response.data;
        this.setState({
          images,
          user,
        });
        console.log(this.state.images[0].comments);
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

  render() {
    const { images, user, errorMessage } = this.state;
    return (
      <div className="profile">
        <h1>Images</h1>
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
    );
  }
}

export default Profile;
