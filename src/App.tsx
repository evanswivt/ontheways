import React, {useEffect} from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import Routes from './routes';
import NavigationScroll from './layouts/NavigationScroll';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
            <ToastContainer />
          </NavigationScroll>
      </ThemeProvider>
  );
}

export default App;
