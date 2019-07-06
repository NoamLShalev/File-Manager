import React, { Component } from "react";

class Popup extends Component {
  render = () => {
    return (
      <div className="popup">
        <div className="inner-popup">
          <h2>Instructions</h2>
          <div className="instructions-p-container">
            <p className="instructions-p">
              To create a file or folder use the buttons in the sidebar.
            </p>
            <p className="instructions-p">
              To delete a file or folder drag and drop it into the trash.
            </p>
            <p className="instructions-p">
              To move a file or folder into another folder drag and drop it into
              the folder of your choice.
            </p>
          </div>
          <button className="close-popup" onClick={this.props.closePopup}>
            &times;
          </button>
        </div>
      </div>
    );
  };
}

export default Popup;
