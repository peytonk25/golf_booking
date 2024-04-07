import React from "react";
import {SetStateAction, useState, useCallback} from "react";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {ProtectedLayout, PublicLayout} from "./components/Routes/index.tsx";

//Import Routes
import Landing from "./routes/Landing/index.tsx"
import Homepage from "./routes/Homepage/index.tsx"
import Register from "./routes/Register/index.tsx"


export default function App() {
  const [isAuth, setAuth] = useState((!!sessionStorage.getItem("token")))


  return (
    <Router >

      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Landing setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route path="/" element={<Homepage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          
        </Route>
        

      </Routes>

    </Router>
  );
}
