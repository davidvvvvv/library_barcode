import React, { useState } from "react";
import Page from "./Page";
import DataContext from "./DataContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";

//var Barcode = require('react-barcode');

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <DataContext>
        <Page />
      </DataContext>
    </div>
  );
}
