import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../config/AxiosInstance'
import MainNavBar from '../../components/NavBar/MainNavBar'
import './CourtDetails.css'

function CourtDetails() {
    const {id}=useParams()  //get the id present in the router
    useEffect(()=>{
        getCourtDatabyId()
    },[])
    const [court,setCourt]=useState({})  //we can only write the hook outside of another hook,if loop,aboue return
    const getCourtDatabyId = ()=>{
        axiosInstance.get('/users/getCourtDatabyId',{params:{id}}).then((res)=>{
debugger
setCourt(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <>
    <MainNavBar/>
    <div className='courtDetails-container'>
        <img  src={`${process.env.REACT_APP_BE_URL}/images/${court.courtPic}`} alt="" />
        <div>{court.courtName}</div>
    </div>
    </>
  )
}

export default CourtDetails
