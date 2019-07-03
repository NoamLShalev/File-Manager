import React, { Component } from "react";
import Upload from "./Upload.jsx";
import AddFolder from "./AddFolder.jsx";
import Folder from "./Folder.jsx";
import File from "./File.jsx";

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
      .then(response => {
        return response.text();
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

  listFolder = id => {
    fetch(
      "http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/" + id + "/ls",
      {
        method: "GET",
        headers: {
          "X-Session-Id": "3592484"
        }
      }
    )
      .then(response => {
        return response.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        let files = parsed.data;
        this.setState({ files: files });
      });
  };

  drop = (event, id) => {
    event.preventDefault();
    let file = event.dataTransfer.getData("text");
    fetch(
      "http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/" +
        file +
        "/move?dest_id=" +
        id,
      {
        method: "PATCH",
        headers: {
          "X-Session-Id": "3592484",
          accept: "application/json"
        }
      }
    )
      .then(response => {
        return response.text();
      })
      .then(body => {
        this.updateFiles();
      });
  };

  render = () => {
    return (
      <div>
        <div className="nav-bar">
          <Upload updateFiles={this.updateFiles} />
          <AddFolder updateFiles={this.updateFiles} />
        </div>
        <div className="files-container">
          {this.state.files.map(file => {
            if (file.metadata.folder === "true") {
              return (
                <Folder
                  key={file.id}
                  file={file}
                  drop={this.drop}
                  listFolder={this.listFolder}
                />
              );
            } else {
              return <File key={file.id} file={file} />;
            }
          })}
        </div>
      </div>
    );
  };
}
export default Homepage;
