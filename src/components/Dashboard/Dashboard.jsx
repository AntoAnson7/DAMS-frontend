import React from 'react'
import "./Dashboard.css"
import Topmenu from "./Topmenu"
import Score from './Score'
import Sidebar from '../Sidebar/Sidebar'
import {useAppData} from "../../AppContext/AppContext"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect,useState } from 'react'
import Rides from "./Rides"

function Dashboard() {
  const navigate=useNavigate()
  const [{ user,utype,rides}, dispatch] = useAppData();
  const [urides,setRides]=useState(null)

  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (urides !== null && urides.length > 0) {
      const totalScore = urides.reduce((sum, uride) => sum + uride.score, 0);
      const average = totalScore / urides.length;
      setAvgScore(average);
    } else {
      setAvgScore(0);
    }
  }, [urides]);

  useEffect(() => {
    if (utype==null){
      console.log(`utype: ${utype}`)
      navigate("/")
    }
    if (utype==0 && user.userid == null) {
      console.log(`utype: ${utype}`)
      navigate("/");
    }
    else if(utype==1 && user.org_id==null){
      console.log(`utype: ${utype}`)
      navigate("/")
    }
  }, [user]);

  const getRides=()=>{
    axios
    .post("http://localhost:5000/get_rides_info", {
      userid: user.userid,
    })
    .then((res) => {
      if(res.data.status){
        // localStorage.setItem("rides",JSON.stringify(res.data.rides))



        // TEMP
        dispatch({
          type:"SET_RIDES",
          rides:res.data.rides
        })
        // TEMP
        
        
        console.log(res.data.rides)
        setRides(res.data.rides)
      }
      else{
        console.log(res.data.message)
      }
    })
    .catch((err) => alert(err));
  }


  useEffect(()=>{
    getRides()
  },[user])
    

  return (
    <div className='Dashboard'>
      <Sidebar />
      {utype==0?(
      <div className="user">
        <h1>{user?.userid}</h1>
        {/* <div className="top-menu">
          <Topmenu/>
        </div> */}
        <div className="score">
          <Score score={avgScore}/>
        </div>

        <h1>Your Recent Drives,</h1>
        <div className="ride">
          {urides?.length>0?urides.map((ride,i)=>(<Rides ride={ride} index={i}/>)):<p className='no-rides-tag'>Uh Oh!You Dont have any rides yet!</p>}
        </div>
      </div>):
      (
        <></>
      )
      
      }

    </div>
  )
}

export default Dashboard