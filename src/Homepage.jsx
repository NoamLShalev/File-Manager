import React, { Component } from "react";
import Upload from "./Upload.jsx";

class Homepage extends Component {
  componentDidMount = () => {
    fetch("http://jeremie.eastus.cloudapp.azure.com:9081/fs/files", {
      method: "GET",
      headers: {
        "X-Session-Id": "3592484"
      }
    })
      .then(header => {
        return header.text();
      })
      .then(body => console.log(body));
  };
  render = () => {
    return (
      <div>
        <Upload />
      </div>
    );
  };
}
export default Homepage;
