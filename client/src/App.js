import React from "react";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./components/history/History";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
