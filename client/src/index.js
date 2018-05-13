import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components"; 
import {NotificationContainer} from 'react-notifications';

import "./css/lib.css";
import "./css/custom.css";
import App from "./container/App.js";
import registerServiceWorker from "./registerServiceWorker";
import * as CSSConstant from "./CSSConstant"
import store from "./store/index.js";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={CSSConstant}>
       <div> <App /> <NotificationContainer /></div>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
