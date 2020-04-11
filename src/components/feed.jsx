import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageCard from './image-card';
import TokenManager from '../utils/token-manager';
import '../styles/profile.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      images: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://mcr-codes-image-sharing-api.herokuapp.com/images')
      .then(response => {
        this.setState({
          images: response.data,
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

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

  handleLike = id => {
    const { images } = this.state;
    const token = TokenManager.getToken();
    axios
      .patch(`https://mcr-codes-image-sharing-api.herokuapp.com/images/${id}/likes`, null, {
        headers: { Authorization: token },
      })
      .then(response => {
        this.setState({
          images: images.map(image => {
            if (image._id === id) {
              return {
                ...image,
                likes: response.data.likes,
                isLiked: response.data.isLiked,
              };
            }

            return image;
          }),
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { images, errorMessage } = this.state;
    return (
      <div className="profile">
        <h1>Images</h1>
        <div className="images-container">
          {errorMessage && <div>{errorMessage}</div>}
          {images.map(({ user, ...image }) => (
            <ImageCard
              key={image._id}
              user={user}
              image={image}
              onLike={this.handleLike}
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

export default Feed;
