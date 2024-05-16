import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate=useNavigate()
  const [registrationType, setRegistrationType] = useState(0); // 0 for user, 1 for organization
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carMileage, setCarMileage] = useState('');

  const [organizationId, setOrganizationId] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (registrationType==0){
        axios
        .post("http://localhost:5000/register", {
          name: name,
          password: password,
          car_no:carNumber,
          car_model:carModel,
          car_mileage:carMileage,
          age:age
        })
        .then((res) => {
            res.data.status?navigate("/"):alert("Organization with provided id not found")
        })
        .catch((err) => alert(err));
    }
    else{
        axios
        .post("http://localhost:5000/register_org", {
            org_id:organizationId,
            org_name:organizationName,
            password:password
        })
        .then((res) => {
            res.data.status?navigate("/"):alert("Successfully created user")
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>REGISTRATION</h2>
        <div className="registration-options">
          <button
            className="reg-button"
            onClick={() => setRegistrationType(0)}
            style={registrationType==0?{backgroundColor:"black",color:"white"}:{backgroundColor:"white",color:"black"}}
          >
            Register as User
          </button>
          <button
            className="reg-button"
            onClick={() => setRegistrationType(1)}
            style={registrationType==1?{backgroundColor:"black",color:"white"}:{backgroundColor:"white",color:"black"}}
          >
            Register as Organization
          </button>
        </div>
        {registrationType === 0 ? (
          <div className='reg-box-user'>
            <label htmlFor="name">What is your name?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="age">How old are you?</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="carNumber">What is your vehicles registration number?</label>
            <input
              type="text"
              id="carNumber"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
            />
            <label htmlFor="carModel">What make is your vehicle?</label>
            <input
              type="text"
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            />
            <label htmlFor="carMileage">Whats the average mileage you get on your car?</label>
            <input
              type="text"
              id="carMileage"
              value={carMileage}
              onChange={(e) => setCarMileage(e.target.value)}
            />
          </div>
        ) : (
          <div className='reg-box-org'>
            <label htmlFor="organizationId">Organization ID:</label>
            <input
              type="text"
              id="organizationId"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
            />
            <label htmlFor="organizationName">Organization Name:</label>
            <input
              type="text"
              id="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>
        )}
        <div className="pwd-container">
            <label htmlFor="password">Create account password</label>
            <input
              type="password"
              id="password"
              className='pwd-box'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className='regi-button' onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Registration;
