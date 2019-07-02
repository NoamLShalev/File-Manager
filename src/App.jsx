import React, { Component } from "react";
import { Route } from "react-router-dom";
import Homepage from "./Homepage.jsx";

class App extends Component {
  renderHomepage = () => {
    return <Homepage />;
  };
  render = () => {
    return (
      <div>
        <Route exact={true} path="/" render={this.renderHomepage} />
        <Route exact={true} path="/folder/:fid" render={this.renderFolder} />
      </div>
    );
  };
}

export default App;
