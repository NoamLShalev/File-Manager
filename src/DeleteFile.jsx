import React, { Component } from "react";

class DeleteFile extends Component {
  deleteFile = id => {
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files/" + id, {
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
        this.props.updateFiles();
      });
  };

  render = () => {
    return (
      <button className="delete" onClick={() => this.deleteFile(this.props.id)}>
        &times;
      </button>
    );
  };
}

export default DeleteFile;
