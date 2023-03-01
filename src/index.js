import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProviderProvider } from "./providers/ProviderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProviderProvider
        contractAddress={"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"}
      >
        <App />
      </ProviderProvider>
    </AuthProvider>
  </React.StrictMode>
);
