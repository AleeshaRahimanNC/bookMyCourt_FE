import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import Home from "../pages/Home/Home";
import AddNewCourt from "../pages/NewCourt/AddNewCourt";
import CourtDetails from "../pages/CourtDetails/CourtDetails";
import CourtListPage from "../pages/CourtListPage/CourtListPage";
import Protected from "./ProtectedRoute/ProtectedRoute";


function Routing() {
  return (
    <>
  
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/home" element={<Protected><Home /></Protected>} />

      <Route path="/courts">
        <Route path="courtlist" element={<Protected><CourtListPage /></Protected>} />
        <Route path="courtDetails/:id" element={<Protected><CourtDetails /></Protected>} />
      </Route>
      
      <Route path="/addNewCourt" element={<Protected><AddNewCourt /></Protected>} />
      
    </Routes>
    
    </>
   
  );
}

export default Routing;
