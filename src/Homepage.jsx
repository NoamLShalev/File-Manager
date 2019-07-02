import React, { Component } from "react";
import Upload from "./Upload.jsx";
import AddFolder from "./AddFolder.jsx";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentDidMount = () => {
    this.updateFiles();
  };

  updateFiles = () => {
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files", {
      method: "GET",
      headers: {
        "X-Session-Id": "3592484"
      }
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        let files = parsed.data;
        files = files.filter(file => {
          return file.is_folder;
        });
        this.setState({ files: files });
      });
  };

  render = () => {
    return (
      <div>
        <Upload updateFiles={this.updateFiles} />
        <AddFolder updateFiles={this.updateFiles} />
        {this.state.files.map(file => {
          return <p key={file.title}>{file.title}</p>;
        })}
      </div>
    );
  };
}
export default Homepage;
