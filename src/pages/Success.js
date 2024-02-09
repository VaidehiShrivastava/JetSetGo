import React from "react";
import Success from "../assets/gifs/Success.gif";
export default function () {
  return (
    <div style={{ paddingTop: "250px", paddingBottom: "250px" }}>
      <div className="outer_container">
        <div className="section">
          <div style={{ display: "flex",alignItems:"center" }}>
            <div>
                <img src={Success} />
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
