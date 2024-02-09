import React, { useState } from "react";
import { Select, Space, DatePicker, Button } from "antd";
import locations from "../data/Locations";

const options = locations;

export default function Landing() {
  const [flightDetails, setFlightDetails] = useState({
    source: null,
    destination: null,
    date: null,
  });

  function handleFlightDetails(e, value) {
    if (
      (value === "source" && e === flightDetails.destination) ||
      (value === "destination" && e === flightDetails.source)
    )
      return;
    else {
      setFlightDetails((prev) => ({
        ...prev,
        [value]: e,
      }));
    }
  }

  return (
    <div className="outer_container">
      {console.log(flightDetails)}
      <div className="section">
        <h1>Shchedule your flights in no time - JetSetGo</h1>
      </div>
      <div className="section">
        <Space.Compact
          block
          direction="horizontal"
          style={{
            width: "100%",
          }}
        >
          <Select
            value={flightDetails.source}
            placeholder="Select Source"
            size="large"
            style={{
              width: "30%",
            }}
            onChange={(e) => handleFlightDetails(e, "source")}
            options={options}
          />
          <Select
            value={flightDetails.destination}
            placeholder="Select Destination"
            size="large"
            style={{
              width: "30%",
            }}
            onChange={(e) => handleFlightDetails(e, "destination")}
            options={options}
          />
          <DatePicker
            value={flightDetails.date}
            style={{
              width: "40%",
            }}
            size="large"
            onChange={(e) => handleFlightDetails(e, "date")}
          />
        </Space.Compact>
      </div>

      <div className="section">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            disabled={
              !flightDetails.source ||
              !flightDetails.destination ||
              !flightDetails.date
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
