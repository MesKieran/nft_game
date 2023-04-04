import React from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./Navbar";
import Footer from './Footer';
import "./Contact.css";

export default function Contact() {
  

  return (
      <div>
      <div className="MainDiv">
      <NavBar/>
      <Container style={{paddingTop:"90px", paddingBottom:"90px"}}>
     
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">
              Contact Me
              </h1>
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4 " style={{ textAlign: "left" }}>Get in touch</h3>
            <address>
              <strong>Email: wuxiangyihui@gmail.com</strong>
              <br />
              <br />
                <p>
                  <strong>Phone: +65 9005 0685</strong>
                </p>
            </address>
            <p>Feel free to tell us about how you feel about the app</p>
            <p>We are always open for feedback</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form  className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name" 
                    type="text"
                    required
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email" 
                    required 
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5" 
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" >
                  Send
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      
      </div>
      <Footer/>
      </div>
      
  );
}