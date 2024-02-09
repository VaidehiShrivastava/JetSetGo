import React from "react";
import SuccessGif from "../assets/gifs/Success.gif";
export default function Success() {
  return (
    <div style={{ paddingTop: "250px", paddingBottom: "250px" }}>
      <div className="outer_container">
        <div className="section">
          <div style={{ display: "flex",alignItems:"center" }}>
            <div>
                <img src={SuccessGif} alt="success"/>
            </div>
            <div>
              <h1>Success!! Your seat is booked </h1>
              <h4>Let&#39;s elevate travel together!</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
