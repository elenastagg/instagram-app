import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: '',
      caption: '',
    };

    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleSelectImage(event) {
    event.preventDefault();
    this.setState({
      selectedImage: event.target.value,
    });
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { caption, selectedImage } = this.state;
    event.preventDefault();
    let formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', selectedImage);
    axios
      .post('https://mcr-codes-image-sharing-api.herokuapp.com/images', {
        formData,
      })
      .then(response => {
        console.log('Upload response:', response);
      })
      .catch(error => {
        console.log('upload error:', error);
      });
  }

  render() {
    const { caption, selectedImage } = this.state;
    return (
      <form className="upload-photo" id="uploadPhoto" onSubmit={this.handleSubmit}>
        <h1>Upload Photo</h1>
        <textarea
          maxLength="2200"
          name="caption"
          form="uploadPhoto"
          placeholder="Enter caption here..."
          value={caption}
          onChange={this.handleFieldChange}
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
          <button id="selectedImage" name="selectedImage">
            Upload
          </button>
        </div>
      </form>
    );
  }
}

export default Upload;
