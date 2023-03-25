import React from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">Blood ChainX</h1>
          </Col>
          <Col md="3">
            <Nav>
              <Nav.Item>
                <Nav.Link to="/" tag={Link}>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link to="/landing-page" tag={Link}>
                  Landing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link to="/register-page" tag={Link}>
                  Register
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link to="/profile-page" tag={Link}>
                  Profile
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <Nav.Item>
                <Nav.Link href="https://creative-tim.com/contact-us?ref=blkdsr-footer">
                  Contact Us
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://creative-tim.com/about-us?ref=blkdsr-footer">
                  About Us
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://creative-tim.com/blog?ref=blkdsr-footer">
                  Blog
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://opensource.org/licenses/MIT">
                  License
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/creativetim"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/creativetim"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-dribbble" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
