import React, { useEffect, useState } from "react";
import { Row, Col, Button, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";
import SingleFlight from "../components/SingleFlight";
import { airlines, fares } from "../data/Constants";

export default function FlightDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { source, destination, date } = state;

  const [checkedAirline, setCheckedAirline] = useState([]);
  const [checkedFare, setCheckedFare] = useState([]);

  const [data, setData] = useState({
    data: [],
    original: [],
    status: "loading",
  });

  async function getTheData() {
    const data = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
    const flights = await data.json();

    const tempData = flights.data.result.filter(
      (i) =>
        i.displayData.source.airport.cityName === source &&
        i.displayData.destination.airport.cityName === destination
    );
    setData({
      data: tempData,
      original: tempData,
      status: "success",
    });
  }

  const onAirlineUpdate = (checkedValues) => {
    setCheckedAirline(checkedValues);
  };

  const onFareUpdate = (checkedValues) => {
    setCheckedFare(checkedValues);
  };

  const resetTheFilters = () =>
  {
    setCheckedAirline([]);
    setCheckedFare([])
  }

  useEffect(() => {
    getTheData();
  }, [state]);

  useEffect(() => {
    let tempData = [...data.original],finalData = [];

    if (checkedAirline.length > 0 && checkedFare.length > 0) {
      tempData.map((item) => {
        if (
          checkedAirline.indexOf(
            item.displayData.airlines[0]["airlineName"]
          ) !== -1
        ) {
          checkedFare.map((i) => {
            let value = i.split(":");
            if (item.fare > parseInt(value[0]) && item.fare < parseInt(value[1]) ) {
                finalData.push(item)
            }
          });
        }
      });
    } else if (checkedAirline.length > 0) {
      tempData.map((item) => {
        if (
          checkedAirline.indexOf(
            item.displayData.airlines[0]["airlineName"]
          ) !== -1
        ) {
            finalData.push(item)
        }
      });
    }
    else if (checkedFare.length > 0) {
        tempData.map((item) => {
            checkedFare.map((i) => {
                let value = i.split(":");
                if (item.fare > parseInt(value[0]) && item.fare < parseInt(value[1]) ) {
                    finalData.push(item)
                }
              });
        });
      }
      else
      {
        finalData = [...data.original]
      }

    setData((prev)=>({
        ...prev,
        data:finalData
    }))
  }, [checkedAirline, checkedFare]);
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Button size="large" onClick={() => navigate("/")}>
          <ArrowLeftOutlined />
          Back
        </Button>
        <h1 style={{ color: "white" }}>Schedule a flight</h1>
      </div>

      <div style={{ height: "650px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="outer_container_nomargin">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                  }}
                >
                  <h3>Showing flights from : </h3>
                  <h1>{source}</h1>
                  <h3>to</h3>
                  <h1>{destination}</h1>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                  }}
                >
                  <h3>Date : </h3>
                  <h1>{new Date(date["$d"]).toDateString()}</h1>
                </div>
              </div>
            </div>
          </Col>

          <Col span={6}>
            <div className="outer_container_nomargin">
              <h3>Filters</h3>
              <div style={{ height: "65vh", overflowY: "scroll" }}>
                <p>
                  <b>Airline</b>
                </p>
                <Checkbox.Group
                  options={airlines}
                  value={checkedAirline}
                  onChange={onAirlineUpdate}
                />
                <p>
                  <b>Fare</b>
                </p>
                <Checkbox.Group
                  options={fares}
                  value={checkedFare}
                  onChange={onFareUpdate}
                />
                <div style={{marginTop:"20px"}}>
                <Button type="primary" size="large" onClick={()=>resetTheFilters()}>Reset</Button>
                </div>
              </div>
            </div>
          </Col>

          <Col span={18}>
            <div className="outer_container_nomargin">
              <div>
                <h3>Flights</h3>
                <div
                  style={{
                    maxHeight: "65vh",
                    height: "65vh",
                    overflowY: "scroll",
                  }}
                >
                  {data.status === "success" ? (
                    <>
                      {data.data.length === 0 ? <div><h1>Oops! No data found.</h1> 
                      <p>Flights are available from <b>Delhi</b> to <b>Mumbai</b> and <b>Mumbai</b> to <b>Chennai.</b></p>
                      <p>If filters are selected, kindly try with different selections. </p>
                      </div>: data.data.map((item) => {
                        return (
                          <SingleFlight
                            fare={item.fare}
                            id={item.id}
                            key={item.id}
                            totalDuration={item.displayData.totalDuration}
                            stopInfo={item.displayData.stopInfo}
                            airline={item.displayData.airlines[0]}
                            date={item.displayData.source.depTime}
                            source={item.displayData.source}
                            destination={item.displayData.destination}
                          />
                        );
                      })}
                    </>
                  ) : (
                    "Loading"
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
