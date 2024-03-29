import React, { useEffect, useState } from "react";
import "./Authorization.css";
import axios from "axios";
import { ErrorToast, successToast } from "../../Pulgins/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { showorhideLoader } from "../../toolkit/generalSlice";


function Signup({ toggleBox }) {
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

  const {showLoader}= useSelector((store=>store.general))
  const dispatch = useDispatch()

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
    dispatch(showorhideLoader(true))
    if (password !== confirmPassword) {
      return ErrorToast("Password is mismatched");
    } else {
      axios
        .post("http://localhost:5000/auth/signup", {
          name,
          email,
          number,
          password,
          confirmPassword,
        })
        .then((res) => {
          successToast(res.message)
          console.log("Sign up successfull", res.data);
          toggleBox("login");
          dispatch(showorhideLoader(false))
        })
        .catch((err) => {
          dispatch(showorhideLoader(false))
          ErrorToast(err?.response?.data.message || 'Something Went Wrong')
          console.log(err);
        });
    }
  };

  return (
    <div className="signup-box d-flex flex-column">
      <h3 className="text-center">SignUp</h3>

      <div className="input-box">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Name"
        />
      </div>

      <div className="input-box">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
        />
      </div>

      <div className="input-box">
        <input
          type="Number"
          name="number"
          value={number}
          onChange={handleNumber}
          placeholder="Mobile Number"
        />
      </div>

      <div className="input-box">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
      </div>

      <div className="input-box">
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder="Confirm Password"
        />
      </div>

      <button className="btn mt-3" onClick={doSignUp}>
        Signup
      </button>

      <div className="register_link">
        <p>
          Already registered user...?{" "}
          <i onClick={() => toggleBox("login")}>Login here</i>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
