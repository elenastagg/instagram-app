import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errorMessage: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const token = TokenManager.getToken();
    const { content } = this.state;
    const { id, onSubmit } = this.props;

    axios
      .post(
        `https://mcr-codes-image-sharing-api.herokuapp.com/images/${id}/comments`,
        {
          content,
        },
        {
          headers: { Authorization: token },
        },
      )
      .then(response => {
        onSubmit(id, response.data);
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { content, errorMessage } = this.state;
    return (
      <form className="comment" onSubmit={this.handleSubmit}>
        Post Comment
        <textarea
          maxLength="800"
          form="comment"
          name="content"
          value={content}
          onChange={this.handleChange}
          placeholder="Comment on this photo"
        />
        <button type="submit" value={content}>
          Post
        </button>
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
      </form>
    );
  }
}

CommentBox.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentBox;
