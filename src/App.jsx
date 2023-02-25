import React from "react";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navb/Navbar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Route } from "react-router-dom";
import { About } from "../components/About/About"; 


function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Container id="Home">
          <Row>
            <Col sm={7} id="space">
              <About />
            </Col>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
