import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";
import store from "store/store";
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div> loading...</div>} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

