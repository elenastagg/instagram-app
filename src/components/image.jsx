import React from 'react';

class Image extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id: '',
      user: '',
      src: '',
      thumb: '',
      caption: '',
      tags: [],
      comments: [],
      timestamp: 0,
      likes: 0,
      isLiked: false,
    };
  }

  render() {
    const {
      _id,
      user,
      src,
      thumb,
      caption,
      tags,
      comments,
      timestamp,
      likes,
      isLiked
    } = this.state

    return (
      <div>
        <img />
      </div>
    );
  }
};

export default Image;
