
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavigationBar from "./components/navigationBar";

import Home from "./pages/Home/index";
import EquityCalculator from "./pages/EquityCalculator/index";
import Settings from "./pages/Settings/index";

function App(): React.ReactElement {
    return (
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/equity-calculator" element={<EquityCalculator/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
