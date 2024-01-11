import React, { useState } from 'react'
import './Authorization.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({toggleBox}) {

    const [logCre, setLogCre] = useState({email:'', password:''})
//   logCre = {
//        email:'',
//        password:''
//   }
const navigate=useNavigate()
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
    <div className="signup-box d-flex flex-column p-3">
    <h3 className="text-center">LogIn</h3>

    
    <label htmlFor=""> Email </label>
    <input type="email" name="email" value={logCre.email} onChange={handleChange} />
    
    <label htmlFor=""> Password </label>
    <input
      type="password"
      name="password"
      value={logCre.password}
      onChange={handleChange}
    />
    

    <button className="btn btn-primary mt-3" onClick={doLogin}>
      Signup
    </button>
    <p>Not a registered user...? <i onClick={()=>toggleBox('signup')}>Signup here</i></p> 
  </div>
  )
}

export default Login