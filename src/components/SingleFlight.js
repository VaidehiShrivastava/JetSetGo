import React from "react";
import { Row, Col, Button } from "antd";
import AirIndia from "../assets/icons/AirIndia.png";
import JetSpice from "../assets/icons/jetspice.png";
import { useNavigate } from "react-router-dom";

export default function SingleFlight(props) {
  const navigate = useNavigate();
  const {
    id,
    fare,
    totalDuration,
    stopInfo,
    airline,
    source,
    destination,
    userDate
  } = props;

  const FlightDetails = (flight, type) => {
    return (
      <div style={{textAlign:"center"}}>
        <p>
          <b>
            {type === "dest"
              ? flight.arrTime.split("T")[1]
              : flight.depTime.split("T")[1]}
          </b>
        </p>
        <p className="p_margin">{flight.airport.airportName}</p>
        <div style={{ display: "flex",justifyContent:"center" }}>
          <p>{flight.airport.cityName} -&nbsp;</p>
          <p> {flight.airport.airportCode}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="single_flight">
      <Row gutter={[16, 16]}>
        
            <Col xs={{ span: 24 }} sm={{span: 24}} md={{span: 24}} lg={{ span: 5 }} xl={{span: 5}}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={airline.airlineName === "JetSpice" ? JetSpice : AirIndia}
                  width={"30px"}
                  height={"30px"}
                  alt="flight"
                />

                <h4 style={{ marginBottom: "5px" }}>{airline.airlineName}</h4>
                <p style={{ fontSize: "12px" }}>
                  #{id}&nbsp;#{airline.flightNumber}
                </p>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{span: 8}} md={{span: 8}} lg={{ span: 5 }} xl={{span: 5}}>
              {FlightDetails(source, "sour")}
            </Col>

            <Col xs={{ span: 24 }} sm={{span: 8}} md={{span: 8}} lg={{ span: 5 }} xl={{span: 5}}>
              <div style={{textAlign:"center"}}>
                <p>
                  <b>{totalDuration}</b>
                </p>
                <p>{stopInfo}</p>
              </div>
            </Col>

            <Col xs={{ span: 24 }} sm={{span: 8}} md={{span: 8}} lg={{ span: 5 }} xl={{span: 5}}>
              {FlightDetails(destination, "dest")}
            </Col>

            <Col xs={{ span: 24 }} sm={{span: 8}} md={{span: 24}} lg={{ span: 4 }} xl={{span: 4}}>
              <div style={{ textAlign: "center",justifyContent:"center" }}>
                <h3>₹ {fare}</h3>
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    navigate("/userDetails", {
                      state: {
                        id: id,
                        date: userDate,
                        fare: fare,
                        totalDuration: totalDuration,
                        airline: airline,
                        source: source,
                        destination: destination
                      },
                    })
                  }
                >
                  Book
                </Button>
              </div>
            </Col>
      </Row>
    </div>
  );
}
