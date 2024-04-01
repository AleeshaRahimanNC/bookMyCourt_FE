import React, { useEffect, useState } from "react";
import './home.css'
import MainNavBar from "../../components/NavBar/MainNavBar";
// import axiosInstance from "../../config/AxiosInstance";
// import CourtCards from "../../components/courtCards/CourtCards"
import Carousal from "../../components/Carousal/Carousal";
import Blocks from "../../components/Blocks/Blocks";
import UspBlocks from "../../components/UspBlocks/UspBlocks";

function Home() {
//   const[courtData,setCourtData]=useState([])
//   useEffect(() => {
//     getCourtsData();
//   },[]);

// const getCourtsData=()=>{
//   //axios.get(`${process.env.REACT_APP_BE_URL}/user/getCourtsData`)
//   axiosInstance.get('/users/getCourtsData')
//   .then((res)=>{
//     setCourtData(res.data)  //[]array of data coming
//   }).catch((err)=>{
// console.log(err)
//   })
// }

  return (
    <>
      <MainNavBar/>
      <Carousal/>
      <Blocks/>
      <UspBlocks/>
      {/* <div className="container-fluid">
          <div className="row gap-2 p-2 home__wrapper">
          {courtData.map((court)=> <CourtCards court={court} />)}
            
          </div>
      </div>
      
       */}
    </>
  );
}

export default Home;
