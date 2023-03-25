import { useEffect, useState } from "react";
import CustomNavbar from "../components/CustomNavbar";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import FetchFromAadhar from "../dummyAPI/fetchAadhar";
import { useNavigate } from "react-router-dom";
import { useAccount, useAddress } from "@thirdweb-dev/react";

export default function Login() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");

  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [aadharCorrect, setAadharCorrect] = useState(false);

  const [alertMessage, setAlert] = useState("");
  const [showAlert, setShow] = useState(false);

  const navigate = useNavigate();

  const account = useAddress();

  function formSubmit() {
    var aadharData = FetchFromAadhar(aadhar);
    if (aadhar === "") {
      setAlert("Enter Aadhar No");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else if (aadharData === undefined) {
      setAlert("Aadhar Not Found in Database");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else if (aadharData !== undefined) {
      if (aadharData.address !== account) {
        setAlert("Wallet address not match with one linked to aadhar");
        setTimeout(() => setShow(false), 3000);
      } else if (otp === "") {
        setAadharCorrect(true);
        setShow(true);
        setAlert("OTP Sent");
        setTimeout(() => setShow(false), 3000);
      } else if (otp !== "1111") {
        setAadharCorrect(true);
        setShow(true);
        setAlert("OTP Wrong");
        setTimeout(() => setShow(false), 3000);
      } else if (otp === "1111") {
        navigate("/redeem", {
          state: {
            aadharNo: aadhar,
          },
        });
      }
    }
  }

  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <div className="page-header" style={{ background: "white" }}>
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Alert show={showAlert} variant="info">
                {alertMessage}
              </Alert>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <Card.Header>
                      <Card.Img
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      />
                      <Card.Title tag="h4">Login</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="my-3">
                          <Form.Control
                            type="aadhar"
                            placeholder="Enter Aadhar"
                            value={aadhar}
                            onChange={(e) => {
                              setAadhar(e.target.value);
                            }}
                          />
                        </Form.Group>
                        {aadharCorrect && (
                          <Form.Group className="my-3">
                            <Form.Control
                              type="otp"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => {
                                setOtp(e.target.value);
                              }}
                            />
                          </Form.Group>
                        )}
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={formSubmit}
                      >
                        {aadharCorrect == false ? "Get OTP" : "Submit OTP"}
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
