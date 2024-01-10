import React, { useEffect, useState } from "react";
import "./Authorization.css";
import axios from "axios";

function Signup({toggleBox}) {
  // const [signUpData, setSignUpData] = usestate({
  //   name:'',
  //   email:'',
  //   number:'',
  //   password:'',
  //   confirmPassword:'',
  // })

  // const handleChange = (e) =>{
  //   console.log(e);
  //   setSignUpData({name:e.target.value})
  // }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    console.log(name, email, number, password, confirmPassword);
  }, [name, email, number, password, confirmPassword]);

  const doSignUp = () => {
    // if (!password === confirmPassword) {
    //   alert("Password is mismatched");
    // } else {
    // }

    axios.post('http://localhost:5000/auth/signup', {name, email, number, password, confirmPassword }).then((res) =>{

    })
.catch((err =>{
  console.log(err);
}))
  };

  return (
    <div className="signup-box d-flex flex-column p-3">
      <h3 className="text-center">SignUp</h3>

      <label htmlFor=""> Name </label>
      <input type="text" name="name" value={name} onChange={handleName} />
      <label htmlFor=""> Email </label>
      <input type="email" name="email" value={email} onChange={handleEmail} />
      <label htmlFor=""> Mobile Number </label>
      <input
        type="Number"
        name="number"
        value={number}
        onChange={handleNumber}
      />
      <label htmlFor=""> Password </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePassword}
      />
      <label htmlFor=""> Confirm Password </label>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />

      <button className="btn btn-primary mt-3" onClick={doSignUp}>
        Signup
      </button>
      <p>Already registered user...? <i onClick={()=>toggleBox('login')}>Login here</i> </p>
    </div>
  );
}

export default Signup;
