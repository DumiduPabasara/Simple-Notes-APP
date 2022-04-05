import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./app/layouts/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./app/layouts/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./app/layouts/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  /*remove strict mode if gets problems with third party libraries*/
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router history={history}>
        <ScrollToTop />
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
