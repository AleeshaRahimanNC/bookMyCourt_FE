import React, { useState } from 'react'
import './Authorization.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../toolkit/userSlice'

function Login({toggleBox}) {

    const [logCre, setLogCre] = useState({email:'', password:''})
//   logCre = {
//        email:'',
//        password:''
//   }
const navigate=useNavigate()
const dispatch=useDispatch() 
const handleChange = (e) =>
{
setLogCre({...logCre, [e.target.name]:e.target.value})
}

const doLogin = () =>{
  console.log(process.env.REACT_APP_BE_URL);
  axios.post(`${process.env.REACT_APP_BE_URL}/auth/login`,logCre).then((res)=>{
    
    if(res.data.message==='Login Successfull'){
      // navigate to home page
      alert(res.data.message);
      localStorage.setItem('token',res.data.token)
      dispatch(setUser(res.data.userDetails))
      navigate('/home')
    }
 })
   .catch((res) =>{
    
    if(res.response.data.message==='Invalid Credentials'){
      alert(res.response.data.message)
    }
    else{
      alert('Something went wrong')
    }
   })
}

  return (
    <div className="signup-box d-flex flex-column">
    <h3 className="text-center">LogIn</h3>

    <div className='input-box'>
    <input type="email" name="email" value={logCre.email} onChange={handleChange} placeholder="Email"/>
    <i class="fa-solid fa-envelope" style={{color:"#FFD43B"}}></i>
    </div>
    
    <div className='input-box'>
    <input
      type="password"
      name="password"
      value={logCre.password}
      onChange={handleChange}
      placeholder="Password"
    />
    <i class="fa-solid fa-lock" style={{color:"#FFD43B"}}></i>
    </div>
    
    <button className="btn mt-3" onClick={doLogin}>
      Signup
    </button>

    <div className='register_link'>
    <p>Not a registered user...? <i onClick={()=>toggleBox('signup')}>Signup here</i></p> 
    </div>

  </div>
  )
}

export default Login