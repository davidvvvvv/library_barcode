import React from "react";
import ReactDOM from "react-dom";
import {Helmet} from "react-helmet"

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      
    </Helmet>
    <App />
  </React.StrictMode>,
  rootElement
);
