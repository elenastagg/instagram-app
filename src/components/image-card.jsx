import React from 'react';
import PropTypes from 'prop-types';
import '../styles/profile.scss';

const ImageCard = ({ _id, caption, src }) => (
  <div className="image-card">
    <div className="image">
      <img alt=" " id={_id} src={src} />
    </div>
    <div>{caption}</div>
  </div>
);

ImageCard.propTypes = {
  _id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageCard;
