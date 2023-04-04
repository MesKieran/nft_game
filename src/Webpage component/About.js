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
            Welcome to our website, where we combine cutting-edge blockchain technology and environmental conservation efforts to create a unique and engaging experience. Our mission is simple yet impactful: to promote environmental awareness and contribute to reforestation efforts while providing an innovative platform for users to learn and participate in the blockchain ecosystem.
            </p>
            <p>
            We believe that everyone can make a difference in saving our planet, and through our platform, we provide an interactive and fun way to learn about the environment and blockchain technology. Our Plant NFTs and Tool NFTs are not just digital assets, but also represent a symbol of hope for a greener future. By using our platform, users can participate in reforestation efforts and earn rewards while learning about the environment.
            </p>
            <p>
            Our team is committed to continuously improving the platform and exploring new ways to make a positive impact on the environment. We are dedicated to creating a more sustainable future, and we invite you to join us in this mission. Thank you for visiting our website, and we hope you enjoy your experience with us.
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
