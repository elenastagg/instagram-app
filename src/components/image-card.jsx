import React from 'react';
import PropTypes from 'prop-types';
import '../styles/image-card.scss';

const ImageCard = ({ handleDelete, image }) => (
  <div className="post-container">
    <div className="image-container">
      <img className="image" alt=" " id={image._id} src={image.src} />
    </div>
    <div className="image-caption">
      <span className="userName">
        {image.user.firstName} {image.user.lastName}{' '}
      </span>
      {image.caption}
    </div>
    <button type="button" onClick={() => handleDelete(image._id)}>
      Delete
    </button>
  </div>
);

ImageCard.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func,
};

ImageCard.defaultProps = {
  handleDelete: () => {},
};

export default ImageCard;
