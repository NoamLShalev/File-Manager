import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined
    };
  }

  generateId = () => {
    return "" + Math.floor(Math.random() * 1000000);
  };

  handleFile = event => {
    let file = event.target.files[0];
    this.setState({ file: file });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    console.log(this.state.file.size);
    data.append("file", this.state.file);
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/upload/3695163", {
      method: "PATCH",
      headers: {
        "X-Session-Id": "3592484"
      },
      body: data
    })
      .then(header => {
        return header.text();
      })
      .then(body => console.log(body));

    this.setState({ file: undefined });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleFile} />
        <input type="submit" value="Upload File" />
      </form>
    );
  };
}

export default Upload;
