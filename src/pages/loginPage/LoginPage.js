import React from "react";
import "./LoginPage.css";
import Signup from "../../components/authorization/Signup";

function LoginPage() {
  return (
    <div className="login_container d-flex justify-content-center align-items-center">
     <Signup/>
    </div>
  );
}

export default LoginPage;
