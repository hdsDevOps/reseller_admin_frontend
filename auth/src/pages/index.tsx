import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const Login = React.lazy(() => import("./Login"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

const AuthApp: React.FC = () => {
  return (
    <Container fluid>
      <Row className="full-height justify-content-center align-items-center px-5">
        <Col sm={3}></Col>
        <Col sm={6}>
          <div className="auth-section secondary-background">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default AuthApp;
