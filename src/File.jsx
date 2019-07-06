import React, { Component } from "react";

class File extends Component {
  dragStart = (event, id) => {
    event.dataTransfer.setData("text", id);
  };

  render = () => {
    let file = this.props.file;
    return (
      <div
        key={file.title}
        className="file"
        draggable="true"
        onDragStart={() => this.dragStart(event, file.id)}
      >
        <img src="/file.png" height="100px" />
        <div className="file-title-container">
          <p>{file.title}</p>
        </div>
      </div>
    );
  };
}

export default File;
