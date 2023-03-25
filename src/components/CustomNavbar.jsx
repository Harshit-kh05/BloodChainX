import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ConnectWallet, useDisconnect } from "@thirdweb-dev/react";
import logo from "../assets/img/logo.png";
export default function CustomNavbar(props) {
  const url = props.url;
  const [color, setColor] = React.useState("navbar-transparent");
  const disconnect = useDisconnect();
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <Navbar
      className={"fixed-top " + color}
      variant="dark"
      color-on-scroll="100"
      expand="lg"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="" width="50" height="50" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto d-flex align-items-center gap-2">
            {(url === "home" || url === "login" || url === "register") && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login-donor">
                  <Nav.Link>Donor Login</Nav.Link>
                </LinkContainer>
              </>
            )}
            {url === "bloodBankHome" && (
              <LinkContainer to="/blood-collection">
                <Nav.Link>Blood Collection</Nav.Link>
              </LinkContainer>
            )}
            {url === "home" && (
              <>
                {/* <LinkContainer to="/login-track">
                  <Nav.Item>Track</Nav.Item>
                </LinkContainer> */}
                <Nav.Item>
                  <ConnectWallet colorMode="dark" accentColor="#5e72e4" />
                </Nav.Item>
              </>
            )}
            {(url === "bloodBankHome" || url === "hospitalHome") && (
              <LinkContainer to="/">
                <Button onClick={disconnect} className="logoutBtn">
                  Log Out
                </Button>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
