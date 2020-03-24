import React from 'react';
import { Link } from 'react-router-dom';

import Image from './image';

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
        {images.map(image => (
          <Image key="key" id={image.id} caption={Image.caption} />
        ))}
        <div>
          <Link to="/upload">Upload Photo</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
