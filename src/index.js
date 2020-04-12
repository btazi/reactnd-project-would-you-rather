import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./theme";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
