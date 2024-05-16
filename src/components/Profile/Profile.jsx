import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';
import { useAppData } from "../../AppContext/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const Profile = () => {
    const [{ user }] = useAppData();
    const [loading, setLoading] = useState(true);
    const profileRef = useRef(null);

    useEffect(() => {
        setLoading(false); // Simulating loading completion
    }, []); // Empty dependency array to run only once when the component mounts

    const qrCodeText = `http://localhost:3000/ratings/user/${user.userid}`;

    const downloadProfileImage = () => {
        if (!profileRef.current) return;

        html2canvas(profileRef.current)
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'profile.png';
                link.click();
            });
    };

    return (
        <div>
            <Sidebar />
            <div className="profile-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    user.userinfo.name && (
                        <div className="profile-box"  ref={profileRef}>
                            
                            <h2 style={{textAlign:"center"}}>Driver Rating</h2>
                            <div className="qr-code">
                                <QRCode value={qrCodeText} size={250}/>
                            </div>
                            <div className="profile-details">
                                <div>
                                    <label>Name:</label>
                                    <span>{user.userinfo.name}</span>
                                </div>
                                <div>
                                    <label>ID:</label>
                                    <span>{user.userid}</span>
                                </div>
                                <div>
                                    <label>Car Number:</label>
                                    <span>{user.userinfo.car_no}</span>
                                </div>
                                <div>
                                    <label>Car Model:</label>
                                    <span>{user.userinfo.car_model}</span>
                                </div>
                                <div>
                                    <label>Age:</label>
                                    <span>{user.userinfo.age}</span>
                                </div>
                                <div>
                                    <label>Car Mileage:</label>
                                    <span>{user.userinfo.car_mileage}</span>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <button className="download" onClick={downloadProfileImage}>Download</button>
        </div>
    );
};

export default Profile;
