import React, { useState,useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';
import './Login.css';
import {useAppData} from "../../AppContext/AppContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [utype, setType] = useState(0);

  const [{ user }, dispatch] = useAppData();

  function autologin() {
    if (localStorage.getItem("user")) {
      const data = localStorage.getItem("user");
      const user_type = localStorage.getItem("type");
      console.log(`auto :${localStorage.getItem("type")}`)
      //! PRINT 
      console.log(data)
      
      dispatch({
        type: "SET_USER",
        user: JSON.parse(data),
      });

      dispatch({
        type: "SET_TYPE",
        acc_type: user_type,
      });
      navigate("/dashboard")
    }
    else{
        navigate("/")
    }
  }

  useEffect(() => {
    autologin();
  }, []);

  const handleLogin = (reg_type) => {
    axios
      .post("http://localhost:5000/login", {
        userid: username,
        password: password,
        type:reg_type
      })
      .then((res) => {
        if(res.data.status){
          localStorage.setItem("user", JSON.stringify(res.data.userdata));
          localStorage.setItem("type", JSON.stringify(reg_type));
          console.log(`auto :${localStorage.getItem("type")}`)
          autologin();
        }
        else{
          console.log(res.data.message)
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login-page">
      <div className="login-img">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/drive.png?alt=media&token=0efa9b6e-12e6-4a39-8733-76086361301f"} alt="" />
      </div>

      <div className="login-container">
        <div className="login-box">
          <h2 style={{color:"#fff"}}>Login</h2>
          <div className="input-container">
            {/* <FaUser className="icon" color='white'/> */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            {/* <FaLock className="icon" color='black'/> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="register-options">
            <button onClick={()=>{handleLogin(0)}}>Login</button>
            <p>Or</p>
            <button className="org-login-button" onClick={()=>{handleLogin(1)}}>Login as Organisation</button>
          </div>

          <button className="register-button" onClick={()=>navigate("/register")}>Register New Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
