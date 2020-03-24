import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: '',
      caption: '',
      errorMessage: '',
    };
  }

  handleSelectImage = event => {
    event.preventDefault();
    this.setState({
      selectedImage: event.target.value,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isSubmitDisabled = () => {
    const { caption, selectedImage } = this.state;
    return caption === '' || selectedImage === '';
  };

  handleSubmit = event => {
    const { history } = this.props;
    const { caption, selectedImage } = this.state;
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', selectedImage);
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
    const { caption, selectedImage, errorMessage } = this.state;
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
          <input
            type="file"
            name="upload"
            onChange={this.handleSelectImage}
            value={selectedImage}
          />
        </div>
        <div>
          <button
            disabled={this.isSubmitDisabled()}
            type="submit"
            type="submit"
            id="selectedImage"
            name="selectedImage"
          >
            Upload
          </button>
        </div>
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
      </form>
    );
  }
}

export default Upload;
