import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      fileMessage: "Choose A File"
    };
  }

  generateId = () => {
    return "" + Math.floor(Math.random() * 1000000);
  };

  handleFile = event => {
    let file = event.target.files[0];
    let message = file.name;
    this.setState({ file: file, fileMessage: message });
  };

  handleSubmit = event => {
    event.preventDefault();
    let info = {
      is_folder: true,
      metadatas: {
        folder: "false"
      },
      title: this.state.file.name,
      size: 0 // (this would be this.state.file.size if it was an actual file)
    };
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/root", {
      method: "POST",
      headers: {
        "X-Session-Id": "3592484",
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(info)
    })
      .then(response => {
        return response.text();
      })
      .then(body => {
        this.props.updateFiles();
        this.setState({ file: undefined, fileMessage: "Choose A File" });
      });

    /*
    if this was an actual file and not a folder this would be the real code after the first fetch request

    .then(response => {
      return fetch(
        "http://jeremie.eastus.cloudapp.azure.com:9081" +
          response.headers.get("location"),
        {
          method: "PATCH",
          headers: {
            "X-Session-Id": "3592484",
            accept: "application/json"
          },
          body: this.state.file
        }
      )
        .then(response => {
          return response.text();
        })
        .then(body => {
          console.log(body);
          this.setState({ file: undefined });
        });
    });
    */
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="custom-file-input"
          type="file"
          id="file"
          onChange={this.handleFile}
        />
        <label className="file-label" for="file">
          {this.state.fileMessage}
        </label>
        <input className="upload" type="submit" value="Upload" />
      </form>
    );
  };
}

export default Upload;
