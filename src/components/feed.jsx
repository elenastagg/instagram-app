import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageCard from './image-card';
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

  render() {
    const { images, errorMessage } = this.state;
    return (
      <div className="profile">
        <h1>Images</h1>
        <div className="images-container">
          {errorMessage && <div>{errorMessage}</div>}
          {images.map(({ user, ...image }) => (
            <ImageCard key={image._id} user={user} image={image} />
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
