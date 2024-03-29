import React, { useState } from "react";
import "./LoginPage.css";
import Signup from "../../components/authorization/Signup";
import Login from "../../components/authorization/Login";


function LoginPage() {
  const [boxtype,setBoxType]=useState('login')
  return (
    <div className="login_container d-flex justify-content-center align-items-center">
            {boxtype==='signup' && <Signup toggleBox={setBoxType}/>}
            {boxtype==='login' && <Login toggleBox={setBoxType}/>}
     
    </div>
  );
}

export default LoginPage;
