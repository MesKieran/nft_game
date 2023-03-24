import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Footer from './Footer';
import Navbar from "./Navbar";
import './About.css';
import ForestImg from "../assets/images/about/Forest.jpg"


const AboutUs = () => {
  return (
    <div>
    <Navbar/>
    <div className="about-us">
      <Container>
        <Row>
          <Col md={6}>
            <h1>About Us</h1>
            <p>
              We are a blockchain company that deploys plant NFTs. Our NFTs are linked with real plants, and users can receive TST token rewards if they hold NFTs. Our mission is to promote sustainable agriculture and reduce carbon emissions through blockchain technology.
            </p>
          </Col>
          <Col md={6}>
            <img className="ForestImg" src={ForestImg} alt="Plants" />
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </div>
  );
};

export default AboutUs;
