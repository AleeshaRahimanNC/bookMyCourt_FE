import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import CourtListBody from "../../components/CourtListBody/CourtListBody";
import Carousal from "../../components/Carousal/Carousal";
import Footer from "../../components/Footer/Footer";
import image3 from '@assets/Turf5.jpeg'

function CourtListPage() {
  return (
    <div className="">

      <MainNavBar />
      <Carousal courtimage1={image3}/>
      <CourtListBody/> 
      <Footer/>

    </div>
  );
}

export default CourtListPage;
