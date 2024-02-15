import React from "react";
import SuccessGif from "../assets/gifs/Success.gif";
import { Row,Col } from "antd";
export default function Success() {
  return (
    <div style={{ paddingTop: "250px", paddingBottom: "250px" }}>
      <div className="outer_container">
        <div className="section">

        <Row gutter={[16, 16]} style={{ height: "100%",alignItems:"center" }}>

        <Col xs={{ span: 0 }} sm={{span: 0}} md={{span: 0}} lg={{ span: 4 }} xl={{span: 4}}></Col>
        <Col xs={{ span: 24 }} sm={{span: 24}} md={{span: 24}} lg={{ span: 8 }} xl={{span: 8}}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <img src={SuccessGif} alt="success" width={"100%"}/>
            </div>
            </Col>

            <Col xs={{ span: 24 }} sm={{span: 24}} md={{span: 24}} lg={{ span: 8 }} xl={{span: 8}}>

            <div style={{textAlign:"center"}}>
              <h1>Success!! Your seat is booked </h1>
              <h4>Let&#39;s elevate travel together!</h4>
            </div>
            </Col>

            <Col xs={{ span: 0 }} sm={{span: 0}} md={{span: 0}} lg={{ span: 4 }} xl={{span: 4}}></Col>

            </Row>

        </div>
      </div>
    </div>
  );
}
