import React from "react"

import { Route, Routes } from "react-router-dom"
import Login from "./login";
import "./App.css";
import MessageUI from "./MessageUi";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
     
     <AuthProvider>
      <Routes>
        <Route path="/"
          element={<Login />} exact
        />

        <Route path='/chat'
          element={<MessageUI />}
        />
      </Routes>
      
      </AuthProvider>
    </div>
  )
}

export default App
