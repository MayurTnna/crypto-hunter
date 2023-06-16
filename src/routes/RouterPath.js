import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinPage from "../pages/CoinPage";
import Home from "../pages/Home";

const RouterPath = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPath;
