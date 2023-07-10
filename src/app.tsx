import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { StoresProvider } from "./providers";
import { createStore } from "./stores";

const App = () => {
  
  const store = createStore({});

  return (
  <StoresProvider value={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StoresProvider>
)};

export { App };
