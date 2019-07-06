import React, { Component } from "react";
import Folder from "./Folder.jsx";
import File from "./File.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

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
        files = files.filter(file => {
          return file.is_folder;
        });
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

  deleteFile = event => {
    event.preventDefault();
    let file = event.dataTransfer.getData("text");
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/" + file, {
      method: "DELETE",
      headers: {
        "X-Session-Id": "3592484",
        "Content-Type": "application/json",
        accept: "application/json"
      }
    })
      .then(response => {
        return response.text();
      })
      .then(body => {
        this.updateFiles();
      });
  };

  render = () => {
    return (
      <>
        <Navbar />
        <div className="main-container">
          <div className="side-bar">
            <Sidebar
              updateFiles={this.updateFiles}
              deleteFile={this.deleteFile}
              drop={this.drop}
              listFolder={this.listFolder}
            />
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
      </>
    );
  };
}
export default Homepage;
