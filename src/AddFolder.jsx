import React, { Component } from "react";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleName = event => {
    this.setState({ name: event.target.value });
  };

  addFolder = event => {
    event.preventDefault();
    let info = {
      is_folder: true,
      metadatas: {
        folder: "true"
      },
      title: this.state.name,
      size: 0
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
        this.setState({ name: "" });
      });
  };

  render = () => {
    return (
      <form onSubmit={this.addFolder}>
        <input
          className="folder-name"
          type="text"
          placeholder="Folder Name"
          onChange={this.handleName}
          value={this.state.name}
        />
        <input className="add-folder" type="submit" value="Add Folder" />
      </form>
    );
  };
}

export default AddFolder;
