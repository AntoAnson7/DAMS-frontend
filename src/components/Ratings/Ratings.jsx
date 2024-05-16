import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "./Ratings.css"
import Score from "../Dashboard/Score"

function Ratings() {
    const navigate = useNavigate();
    const { userid } = useParams();

    const [deets, setDeets] = useState(null);
    const [score, setScore] = useState(null);
    const [avgInformations, setAvgInformations] = useState(null);

    function autofetch() {
        if (localStorage.getItem("rating_info")) {
            const data = JSON.parse(localStorage.getItem("rating_info"));
            setDeets(data);
        }
        else {
            navigate("/");
        }
    }

    useEffect(() => {
        autofetch();
        console.log(avgInformations)
    }, []);

    useEffect(() => {
        if (!deets) {
            axios
                .post("http://localhost:5000/get_info", {
                    userid: userid,
                })
                .then((res) => {
                    if (res.data.status) {
                        console.log(res.data);
                        localStorage.setItem("rating_info", JSON.stringify(res.data));
                        setDeets(res.data);
                    }
                    else {
                        console.log(res.data.message);
                    }
                })
                .catch((err) => alert(err));
        }
    }, [deets, userid]);

    useEffect(() => {
        if (deets && deets.rides_data && deets.rides_data.length > 0) {
            const scores = deets.rides_data.map(ride => ride.score);
            const averageScore = scores.reduce((total, score) => total + score, 0) / scores.length;
            setScore(averageScore);


            const sumInformations = deets.rides_data.reduce((acc, ride) => {
                acc.avg_speed += ride.avg_speed;
                acc.cell_time += ride.cell_time;
                acc.inattention += ride.inattention;
                acc.pose_unsafe_perc += ride.pose_unsafe_perc;
                acc.distance += ride.distance;
                acc.ride_duration += ride.ride_duration;
                acc.drowsiness_status_count += ride.drowsiness_status === 1 ? 1 : 0;
                return acc;
            }, { 
                avg_speed: 0, 
                cell_time: 0, 
                inattention: 0, 
                pose_unsafe_perc: 0, 
                distance: 0, 
                ride_duration: 0, 
                drowsiness_status_count: 0 
            });

            const avgInformations = {
                avg_speed: sumInformations.avg_speed / deets.rides_data.length,
                cell_time: sumInformations.cell_time,
                inattention: sumInformations.inattention / deets.rides_data.length,
                pose_unsafe_perc: sumInformations.pose_unsafe_perc / deets.rides_data.length,
                distance: sumInformations.distance,
                ride_duration: sumInformations.ride_duration,
                drowsiness_status_count: sumInformations.drowsiness_status_count
            };

            setAvgInformations(avgInformations);
        }
    }, [deets]);

    return (
        <div>
            {deets && deets.userinfo_data && (
                <div className="ratings">
                    
                    <div className='score-in-rating'>
                        <Score score={score}/>
                    </div>
                    
                    {avgInformations&&(<div className="information">
                        <p style={{fontWeight:"bold",fontSize:"30px",textAlign:"center",color:"white"}}>{deets.userinfo_data.name}</p>

                        <div className="speed-distance">
                            <div className="speed">
                                <label htmlFor="">Average Speed</label>
                                <p className=''>{avgInformations.avg_speed} KM/h</p>
                            </div>
                            <div className="distance">
                                <label htmlFor="">Distance Travelled</label>
                                <p className=''>{avgInformations.distance.toFixed(2)} KM</p>
                            </div>
                        </div>
                        

                        <div className="duration">
                            <label>Total driving time</label>
                            {/* <p>{avgInformations.ride_duration}</p> */}
                            <p>25 minuntes</p>
                        </div>

                        {avgInformations.drowsiness_status_count>0&&
                        <div className="drowsy-info">
                            <label>Drowsiness Status</label>
                            <p>Drowsiness Detected in : <span style={{fontWeight:"bold"}}>{avgInformations.drowsiness_status_count}/{deets.rides_data.length}</span> rides</p>
                            <div className="images-drowsy">
                                {deets.rides_data.map(m=>{
                                    if (m.drowsiness_status==1){
                                        return <img className='drowsy-img' src={m.links} alt="" />
                                    }
                                })}
                            </div>
                        </div>}

                        {avgInformations.cell_time>10&&
                        <div className="drowsy-info">
                            <label>Mobile usage status</label>
                            <p>Unsafe mobile phone usage Detected for <span style={{fontWeight:"bold"}}>{avgInformations.cell_time.toFixed(0)}</span> seconds</p>
                            <div className="images-drowsy">
                                {deets.rides_data.map(m=>{
                                    if (m.cellphone_det==1){
                                        return <img className='drowsy-img' src={m.cell_link} alt="" />
                                    }
                                })}
                            </div>
                        </div>}

                        <div className="unsafe-inattention">
                            <div className="unsafe">
                                <p>Unsafe posture : {avgInformations.pose_unsafe_perc.toFixed(2)}%</p>
                            </div>

                            <div className="r-inattention">
                                <p>Unattentive : {avgInformations.inattention.toFixed(2)}%</p>
                            </div>
                        </div>
                    
                    </div>)}
                </div>
                
            )}
        </div>
    )
}

export default Ratings;
