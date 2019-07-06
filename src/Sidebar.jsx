import React, { Component } from "react";
import Upload from "./Upload.jsx";
import AddFolder from "./AddFolder.jsx";
import DeleteFile from "./DeleteFile.jsx";
import Folder from "./Folder.jsx";

class Sidebar extends Component {
  render = () => {
    let root = { title: "Root Folder", id: "root" };
    return (
      <>
        <div className="form-container">
          <Upload updateFiles={this.props.updateFiles} />
          <AddFolder updateFiles={this.props.updateFiles} />
        </div>
        <Folder
          file={root}
          drop={this.props.drop}
          listFolder={this.props.listFolder}
        />
        <DeleteFile deleteFile={this.props.deleteFile} />
      </>
    );
  };
}

export default Sidebar;
