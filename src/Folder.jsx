import React, { Component } from "react";

class Folder extends Component {
  allowDrop = event => {
    event.preventDefault();
  };

  dragStart = (event, id) => {
    event.dataTransfer.setData("text", id);
  };

  render = () => {
    let file = this.props.file;
    return (
      <div
        key={file.title}
        className="folder"
        draggable="true"
        onDragStart={() => this.dragStart(event, file.id)}
        onDragOver={this.allowDrop}
        onDrop={() => this.props.drop(event, file.id)}
        onClick={() => this.props.listFolder(file.id)}
      >
        <img src="/folder.png" height="100px" />
        <div className="file-title-container">
          <p>{file.title}</p>
        </div>
      </div>
    );
  };
}

export default Folder;
