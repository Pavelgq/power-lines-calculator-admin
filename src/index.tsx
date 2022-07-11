import React from "react";
import ReactDOM from "react-dom";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import * as serviceWorker from "./serviceWorker";
import { RoutesList } from "./routing/Routes";

type SupportedLocales = keyof typeof locales;

const theme = {
  palette: {
    primary: {
      main: "#ce1e19",
    },
    secondary: {
      main: "#201d2a",
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={createTheme(theme, locales["ruRU" as SupportedLocales])}
      >
        <BrowserRouter basename="/">
          <RoutesList />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
