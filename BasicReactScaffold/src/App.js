import React from "react";

import "./assets/styles/main.scss";

const App = (props) => {
  return (
    <div className="main-app">
      <h1>This app is currently running in {process.env.NODE_ENV} mode</h1>

      <div className="content">Hello World!</div>
    </div>
  );
};

export default App;
