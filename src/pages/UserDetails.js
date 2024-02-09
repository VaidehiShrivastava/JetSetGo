import React from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  DatePicker,
  Checkbox,
  Select,
  InputNumber,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AirIndia from "../assets/icons/AirIndia.png";
import JetSpice from "../assets/icons/jetspice.png";
import { guideLines } from "../data/Constants";

import { useNavigate, useLocation } from "react-router-dom";
import PrimaryIcon from "../components/PrimaryIcon";

export default function UserDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { date, id, fare, totalDuration, airline, source, destination } = state;

  const onFinish = (values) => {
    navigate("/success");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const FlightDetails = (flight, type) => {
    return (
      <div>
        <p>
          <b>
            {type !== "dest" ? "Arrival - " : "Departure - "}
            {type === "dest"
              ? flight.arrTime.split("T")[1]
              : flight.depTime.split("T")[1]}
          </b>
        </p>
        <p className="p_margin">{flight.airport.airportName}</p>
        <div style={{ display: "flex" }}>
          <p>{flight.airport.cityName} -&nbsp;</p>
          <p> {flight.airport.airportCode}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Button
          size="large"
          onClick={() =>
            navigate("/flightdetails", {
              state: {
                date: date,
                source: source.airport.cityName,
                destination: destination.airport.cityName,
              },
            })
          }
        >
          <ArrowLeftOutlined />
          Back to selection
        </Button>
        <h1 style={{ color: "white" }}>Flight Details</h1>
      </div>

      <div style={{ height: "650px" }}>
        <Row gutter={[16, 16]} style={{ height: "100%" }}>
          <Col span={12}>
            <div
              className="outer_container_nomargin"
              style={{ padding: "25px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={airline.airlineName === "JetSpice" ? JetSpice : AirIndia}
                  width={"100px"}
                  height={"100px"}
                />
                <h3>Flight id : {id}</h3>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3>Source Details</h3>
                  {FlightDetails(source, "sour")}
                </div>
                <div>
                  <h3>Destination Details</h3>
                  {FlightDetails(destination, "dest")}
                </div>
              </div>

              <h3>Guildlines</h3>

              <ul style={{ marginBlockStart: "0em" }}>
                {guideLines.map((item) => {
                  return (
                    <li style={{ margin: "0px" }}>
                      <p>{item}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>

          <Col span={12}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <div className="outer_container_nomargin">
                <h1>Enter passanger details</h1>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="fullName"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name",
                        },
                        { whitespace: true },
                        { min: 3 },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="Type your name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="Type your email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="dob"
                      label="Date of Birth"
                      rules={[
                        {
                          required: true,
                          message: "Please provide your date of birth",
                        },
                      ]}
                      hasFeedback
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        picker="date"
                        placeholder="Chose date of birth"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Gender"
                      requiredMark="optional"
                    >
                      <Select placeholder="Select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <h3>Enter card details</h3>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="Card Number"
                      label="Card Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name",
                        },
                        {
                          type: "phone",
                          message: "Please enter a valid number",
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Enter card number"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="expiryDate"
                      label="Expiry date"
                      rules={[
                        {
                          required: true,
                          message: "Please provide card expiry date",
                        },
                      ]}
                      hasFeedback
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        picker="date"
                        placeholder="Chose date of expiry"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="CVV"
                      label="CVV"
                      rules={[
                        {
                          required: true,
                          message: "Please enter cvv",
                        },
                        {
                          type: "number",
                          message: "Please enter a valid cvv",
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber
                        placeholder="CVV"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px",
                  }}
                >
                  <PrimaryIcon />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px",
                  }}
                >
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button block type="primary" htmlType="submit">
                      Book my seat
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
