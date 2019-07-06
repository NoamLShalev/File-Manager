import React, { Component } from "react";
import Popup from "./Popup.jsx";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }
  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  render = () => {
    let popup = "";
    if (this.state.showPopup) {
      popup = <Popup closePopup={this.togglePopup} />;
    }
    return (
      <div className="nav-bar">
        <div className="logo">
          <img src="/logo.png" height="50px" />
          <h2 className="logo-title">File Manager</h2>
        </div>
        <button onClick={this.togglePopup} className="instructions">
          Help
        </button>
        {popup}
      </div>
    );
  };
}

export default Navbar;
