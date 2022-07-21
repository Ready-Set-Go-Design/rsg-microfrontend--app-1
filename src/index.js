import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
let loaded = false;
let root;

window.renderApp1 = (containerId, history) => {
  console.log("rendering app1");

  if (!loaded) {
    console.log("going this thing");
    root = ReactDOM.createRoot(
      containerId
        ? document.getElementById(containerId)
        : document.getElementById("root")
    );
    loaded = true;
  }
  root.render(<App history={history} />);

  // unregister();
};

window.unmountApp1 = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
