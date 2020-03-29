import React from 'react';
import PropTypes from 'prop-types';
import '../styles/profile.scss';

const ImageCard = ({ _id, caption, src }) => (
  <div className="post-container">
    <div className="image-container">
      <img className="image" alt=" " id={_id} src={src} />
    </div>
    <div className="image-caption">{caption}</div>
  </div>
);

ImageCard.propTypes = {
  _id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageCard;
