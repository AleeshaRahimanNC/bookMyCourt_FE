import React from 'react'
import {Route,Routes} from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage'
import Home from '../pages/Home/Home'
import AddNewCourt from '../pages/NewCourt/AddNewCourt'
import CourtDetails from '../pages/CourtDetails/CourtDetails'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        
        <Route path='/home' element={<Home/>}/>


        <Route path='/addNewCourt' element={<AddNewCourt/>}/>
        <Route path='/courtDetails/:id' element={<CourtDetails/>}/>
    </Routes>
  )
}

export default Routing