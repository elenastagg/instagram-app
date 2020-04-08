/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import CommentBox from './comment-box';
import '../styles/image-card.scss';

const ImageCard = ({ onDelete, user, image, onComment }) => (
  <div className="post-container">
    <div className="image-container">
      <button type="button" onClick={() => onDelete(image._id)}>
        Delete
      </button>
      <img className="image" alt=" " id={image._id} src={image.src} />
    </div>
    <div className="image-caption">
      <span className="userName">
        {user.firstName} {user.lastName}{' '}
      </span>
      {image.caption}
      <div>
        <CommentBox id={image._id} onSubmit={onComment} />
      </div>
      {image.comments.map(comment => (
        <div key={comment._id} user={user}>
          {comment.author.firstName} {comment.author.lastName} {comment.content}
        </div>
      ))}
    </div>
  </div>
);

ImageCard.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string,
    caption: PropTypes.string,
    src: PropTypes.string,
    comments: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onComment: PropTypes.func,
};

ImageCard.defaultProps = {
  onDelete: () => {},
  onComment: () => {},
};

export default ImageCard;
