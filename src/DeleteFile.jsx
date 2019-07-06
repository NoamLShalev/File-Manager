import React, { Component } from "react";

class DeleteFile extends Component {
  allowDrop = event => {
    event.preventDefault();
  };

  render = () => {
    return (
      <img
        onDragOver={this.allowDrop}
        onDrop={this.props.deleteFile}
        src="/trash.png"
        height="100px"
        className="trash"
      />
    );
  };
}

export default DeleteFile;
