
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";

import NavigationBar from "./components/NavigationBar";
import Home from "./routes/Home";

function App() {
  return (
    <div >
      <NavigationBar/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
