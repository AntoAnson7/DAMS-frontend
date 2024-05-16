import React, { useEffect, useState } from 'react';
import './Rides.css';
import ScoreCommon from '../ScoreCommon';
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";

const Rides = ({ ride,index }) => {

  const [stat,setStat]=useState("")
  const [color,setColor]=useState("black")


  const [show,setShow]=useState(false)

  const computed=(val)=>{
    if (val>=7.5){
      return {stat:"Good!",color:"green"}
    }
    else if(val<7.5 && val >=4){
      return {stat:"Average!",color:"orange"}
    }
    else{
      return {stat:"Bad!",color:"red"}
    }
  }
  useEffect(()=>{
    const data=computed(ride.score)
    setStat(data.stat)
    setColor(data.color)
  },[])

  return (
    <div className="ride-container" style={{transition:"all 0.2s ease"}}>
        <div className="rides-top">
          
          <div className="rides-data">
            <div className="rides-left">
              <p className='ride-name'>Ride {index+1}</p>
              <p className='ride-score'>Performance : <span style={{color:color}}>{stat}</span></p>
            </div>

            <div className="date">
              <p className='ride-name'>Date</p>
              <p>{ride.date}</p>
            </div>

            <div className="start">
              <p className='ride-name'>Start time</p>
              <p>{ride.start_time}</p>
            </div>

            <div className="end">
              <p className='ride-name'>End time</p>
              <p>{ride.end_time}</p>
            </div>
            
            <div className="rides-right">
              <ScoreCommon score={ride.score}/>
            </div>


          </div>
          
          <div className="view-more" style={{transition:"all 0.2s ease"}}>
            {show==true?<MdExpandLess size={"40px"} onClick={()=>setShow(!show)}/>:
            <MdExpandMore size={"40px"} onClick={()=>setShow(!show)}/>}
          </div>
        </div>

        {show&&<div className="rides-bottom">
          <div className="drowsy-cell"
          >
            <div className="critical-box"
              style={{
                color:"white",
                  backgroundColor: ride.drowsiness_status === 0 ? "rgba(0,139,0, 0.6)" : "rgba(255,0,0, 0.5)",
              }}
            >
            <p className='ride-name'>Drowsiness Status</p>
              {ride.drowsiness_status==1?
              <div className="drowsiness-box">
                <p className='critical'>critical errors</p>
                <p>You have been drowsy on this drive</p>
                <img className='link-image' src={ride.links} alt="" />
              </div>
              
              :
              <div className="undrowsy">
                <p className='uncritical'>No critical errors</p>
                <p>Congrats! You have'nt been drowsy on this ride, Keep it up</p>
              </div>}
            
            {/* <div className="drowsiness-box">
              
              
            </div> */}
            </div>

            <div className="cell-box"
                style={{
                  color:"white",
                  backgroundColor: ride.cellphone_det === 0 ? "rgba(0,139,0, 0.6)" : "rgba(255,0,0, 0.5)",
              }}
            >
              {ride.cellphone_det==1?
              <div className="cell-det-box" >
                <p className="ride-name">Mobile Phone Usage</p>
                <p className='cell-det critical'>Unsafe level of mobile phone usage detected</p>
                <p className='cell-perc'>Time on mobile phone : <span>{Math.floor(parseFloat(ride.cell_time))}</span> seconds</p>
                <img className='link-image' src={ride.cell_link} alt="" />
              </div>
              :
              <div className="cell-undet-box">
                <p>Mobile phone usage level : Normal</p>
                <p className='cell-perc'>Time on mobile phone : <span>{ride.cell_time}</span> seconds</p>
              </div>}
            </div>
          </div>

          <div className="inattention" style={{paddingLeft:"30px"}}>
            <p className='ride-name' style={{marginTop:"50px"}}>Attention</p>
            <p className='sub-tag'>Your innattention percentage on this ride is : <span>{ride.inattention.toFixed(2)}%</span></p>
          </div>

          <div className="ride-info" style={{paddingLeft:"30px",marginTop:"50px"}}>
            <p className='ride-name'>Ride information</p>
            <p className='sub-tag'>Distance covered : <span>{ride.distance.toFixed(2)} KM</span></p>
            <p className='sub-tag'>Average speed : <span>{ride.avg_speed} KM/H</span> </p>
            <p className='sub-tag'>Ride duration : <span>{ride.ride_duration.substring(0,3)} Minutes</span> </p>
          </div>
        </div>}
    </div>
  );
};

export default Rides;
