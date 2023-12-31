import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/App.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { AppRouter } from "./router";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <React.StrictMode>
        <Router>
          <AppRouter />
        </Router>
      </React.StrictMode>
    </AuthProvider>
  </ChakraProvider>
);
