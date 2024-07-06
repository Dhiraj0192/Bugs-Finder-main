import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ContextProvider from "./context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>

      <ToastContainer />
    </Provider>
  </ContextProvider>
);

reportWebVitals();
