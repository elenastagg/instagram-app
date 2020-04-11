import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';
import '../styles/upload.scss';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      src: '',
      errorMessage: '',
      imageUrl: '',
    };
  }

  handleSelectImage = event => {
    event.preventDefault();
    this.setState({
      src: event.target.files[0],
      imageUrl: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isSubmitDisabled = () => {
    const { caption, src } = this.state;
    return caption === '' || src === '';
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { caption, src } = this.state;
    const token = TokenManager.getToken();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', src);
    if (token !== null) {
      axios
        .post('https://mcr-codes-image-sharing-api.herokuapp.com/images', formData, {
          headers: { Authorization: token },
        })
        .then(() => {
          history.push(`/profile/${TokenManager.getTokenPayLoad()._id}`);
        })
        .catch(error => {
          this.setState({ errorMessage: error.response.data.message });
        });
    }
  };

  render() {
    const { caption, src, errorMessage, imageUrl } = this.state;
    return (
      <form id="uploadPhoto" onSubmit={this.handleSubmit}>
        <h1>Upload Photo</h1>
        <textarea
          maxLength="2200"
          name="caption"
          form="uploadPhoto"
          placeholder="Enter caption here..."
          value={caption}
          onChange={this.handleChange}
        />
        <div>
          {imageUrl ? <img alt="preview" className="preview-image" src={imageUrl} /> : null}
        </div>
        <div>
          <input type="file" name="upload" onChange={this.handleSelectImage} file={src} />
        </div>
        <div>
          <button disabled={this.isSubmitDisabled()} type="submit" src={src} value={src}>
            Upload
          </button>
        </div>
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
      </form>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Upload;
