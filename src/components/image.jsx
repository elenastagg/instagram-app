import React from 'react';
import TokenManager from '../utils/token-manager';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      user: TokenManager.getTokenPayLoad(),
      src: '',
      caption: '',
      tags: [],
      comments: [],
    };
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Image;
