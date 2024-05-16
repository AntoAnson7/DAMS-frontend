import React from 'react';
import './Topmenu.css'; // Import the CSS file
import {useAppData} from "../../AppContext/AppContext"

const Topmenu = () => {
  const [{ user }] = useAppData();
  return (
    <div className="rectangular-component">
      <div className="field">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/drives.png?alt=media&token=8eb7b86c-31d8-45ff-bc00-50b40a0142bd"} alt="Drives Icon" className="icon" />
        <div className="data">
          <span className="name">Drives</span>
          <span className="value">{user.rides}</span>
        </div>
      </div>
      <hr className="separator" />

      <hr className="separator" />
      <div className="field">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/miles.png?alt=media&token=f54e8639-b493-4278-8fb6-609998bd7715"} alt="Miles Icon" className="icon" />
        <div className="data">
          <span className="name">Kilometers driven</span>
          <span className="value">{user.userinfo.distance}</span>
        </div>
      </div>
      <hr className="separator" />
      <div className="field">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/error.png?alt=media&token=bc499f27-ede2-4a9b-b947-1d5f324f5152"} alt="Errors Icon" className="icon" />
        <div className="data">
          <span className="name">Critical errors</span>
          <span className="value">5</span>
        </div>
      </div>
      <hr className="separator" />
      <div className="field">
        <img src={"https://firebasestorage.googleapis.com/v0/b/dams-4d380.appspot.com/o/miles.png?alt=media&token=f54e8639-b493-4278-8fb6-609998bd7715"} alt="Speed Icon" className="icon" />
        <div className="data">
          <span className="name">Average speed</span>
          <span className="value">{user.userinfo.avg_speed}</span>
        </div>
      </div>
    </div>
  );
};

export default Topmenu;
