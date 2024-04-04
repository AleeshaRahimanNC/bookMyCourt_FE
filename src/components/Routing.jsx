import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import Home from "../pages/Home/Home";
import AddNewCourt from "../pages/NewCourt/AddNewCourt";
import CourtDetails from "../pages/CourtDetails/CourtDetails";
import CourtListPage from "../pages/CourtListPage/CourtListPage";


function Routing() {
  return (
    <>
  
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/home" element={<Home />} />

      <Route path="/courts">
        <Route path="courtlist" element={<CourtListPage />} />
        <Route path="courtDetails/:id" element={<CourtDetails />} />
      </Route>
      
      <Route path="/addNewCourt" element={<AddNewCourt />} />
      
    </Routes>
    
    </>
   
  );
}

export default Routing;
