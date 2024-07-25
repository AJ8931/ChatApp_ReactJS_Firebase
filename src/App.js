import React from "react";

import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import "./App.css";
import MessageUI from "./Pages/MessageUi";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/chat" element={<MessageUI />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
