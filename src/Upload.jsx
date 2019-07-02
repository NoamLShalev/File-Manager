import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      title: "",
      desc: ""
    };
  }

  generateId = () => {
    return "" + Math.floor(Math.random() * 1000000);
  };

  handleFile = event => {
    let file = event.target.files[0];
    this.setState({ file: file });
  };

  handleTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleDesc = event => {
    this.setState({ desc: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let info = {
      is_folder: false,
      title: this.state.title,
      description: this.state.desc,
      size: this.state.file.size
    };
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/root", {
      method: "POST",
      headers: {
        "X-Session-Id": "3592484",
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(info)
    }).then(response => {
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
          this.setState({ file: undefined, title: "", desc: "" });
        });
    });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleFile} />
        <input
          type="text"
          placeholder="Title"
          onChange={this.handleTitle}
          value={this.state.title}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={this.handleDesc}
          value={this.state.desc}
        />
        <input type="submit" value="Upload File" />
      </form>
    );
  };
}

export default Upload;
