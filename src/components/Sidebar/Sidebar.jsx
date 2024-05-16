import React, { useEffect, useState } from 'react';
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; 
import { useNavigate } from 'react-router-dom';
import {useAppData} from "../../AppContext/AppContext"


const Sidebar = () => {
  const navigate=useNavigate()
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [{ user }, dispatch] = useAppData();

  const handleOptionClick = (option) => {
    if (option!='logout'){
      setSelectedOption(option);
      navigate(`/${option}`)
    }
    else{
      localStorage.removeItem("user");
      localStorage.removeItem("type");
      localStorage.removeItem("rides");
      dispatch({
        type: "SET_USER",
        user: {},
      });

      dispatch({
        type: "SET_TYPE",
        acc_type: null,
      });

      dispatch({
        type:"SET_RIDES",
        rides:[],
      })

      navigate("/")
    }
  };


  return (
    <div className="sidebar">
      <div className="logo">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/logo.png?alt=media&token=4988e20f-e0aa-4476-877e-7c4b880cd2c8"} alt="Logo" />
      </div>
      <ul className="options">
        <li
          className={selectedOption === 'profile' ? 'active' : ''}
          onClick={() => handleOptionClick('profile')}
        >
          <FaUser className='icon-sidebar'/>
          <span>Profile</span>
        </li>
        <li
          className={selectedOption === 'dashboard' ? 'active' : ''}
          onClick={() => handleOptionClick('dashboard')}
        >
          <FaChartBar className='icon-sidebar'/>
          <span>Dashboard</span>
        </li>
        
        <li
          className={selectedOption === 'logout' ? 'active' : ''}
          onClick={() => handleOptionClick('logout')}
        >
          <FaSignOutAlt className='icon-sidebar'/>
          <span>Log-out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
