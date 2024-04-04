import React, { useState } from "react";
import "./Authorization.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../toolkit/userSlice";
import { ErrorToast, successToast } from "../../Pulgins/Toast/Toast";
import { showorhideLoader } from "../../toolkit/generalSlice";


function Login({ toggleBox }) {
  const [logCre, setLogCre] = useState({ email: "", password: "" });
  //   logCre = {
  //        email:'',
  //        password:''
  //   }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setLogCre({ ...logCre, [e.target.name]: e.target.value });
  };

  const doLogin = () => {
    console.log(process.env.REACT_APP_BE_URL);
    dispatch(showorhideLoader(true))
    axios
      .post(`${process.env.REACT_APP_BE_URL}/auth/login`, logCre)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          // navigate to home page
  
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.userDetails.role);
          dispatch(setUser(res.data.userDetails));
          navigate("/home");
          dispatch(showorhideLoader(false))
          successToast("Login Successfull");
        }
      })
      .catch((res) => {
        if (res.response.data.message === "Invalid Credentials") {
          dispatch(showorhideLoader(false))
          alert(res.response.data.message);
        } else {
          dispatch(showorhideLoader(false))
          ErrorToast("Something went wrong");
        }
      });
  };

  return (
    <div className="signup-box d-flex flex-column">
      <h3 className="text-center">LogIn</h3>

      <div className="input-box">
        <input
          type="email"
          name="email"
          value={logCre.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ paddingLeft: "20px" }}
        />
        <i class="fa-solid fa-envelope" style={{ color: "#FFD43B" }}></i>
      </div>

      <div className="input-box">
        <input
          type="password"
          name="password"
          value={logCre.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <i class="fa-solid fa-lock" style={{ color: "#FFD43B" }}></i>
      </div>

      <button className="btn mt-3" onClick={doLogin}>
        Login
      </button>

      <div className="register_link">
        <p>
          Not a registered user...?{" "}
          <i onClick={() => toggleBox("signup")}>Signup here</i>
        </p>
      </div>
    </div>
  );
}

export default Login;
