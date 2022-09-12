import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import {HashRouter} from "react-router-dom";
import config from "./constants/config";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter basename={config.basename} >
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </HashRouter>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
