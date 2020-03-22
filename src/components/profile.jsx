import React from 'react';
import Image from './image';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <h1>Images</h1>
        {this.state.images.map(image => (
          <Image id={image._id} caption={Image.caption} />
        ))}
        <div>
          <Link to="/upload">Upload Photo</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
