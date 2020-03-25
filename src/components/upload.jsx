import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      caption: '',
      errorMessage: '',
    };
  }

  handleSelectImage = event => {
    event.preventDefault();
    this.setState({
      _id: event.target.value,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isSubmitDisabled = () => {
    const { caption, _id } = this.state;
    return caption === '' || _id === '';
  };

  handleSubmit = event => {
    const { history } = this.props;
    const { caption, _id } = this.state;
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', _id);
    axios
      .post('https://mcr-codes-image-sharing-api.herokuapp.com/images', {
        formData,
      })
      .then(response => {
        console.log('Upload response:', response);
        history.push('/profile');
      })
      .catch(error => {
        console.log('upload error:', error);
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { caption, _id, errorMessage } = this.state;
    return (
      <form className="upload-photo" id="uploadPhoto" onSubmit={this.handleSubmit}>
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
          <input type="file" name="upload" onChange={this.handleSelectImage} value={_id} />
        </div>
        <div>
          <button disabled={this.isSubmitDisabled()} type="submit" id="_id" name="_id">
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
