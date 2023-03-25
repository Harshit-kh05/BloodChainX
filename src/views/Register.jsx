import { useContext, useEffect, useState } from "react";
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
import globalContext from "../context/GlobalUserContext";
import Preloader from "../components/Preloader";
import { useNavigate } from "react-router-dom";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

export default function Register() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [add, setAdd] = useState("");
  const [type, setType] = useState("");
  const [alertMessage, setAlert] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShow] = useState(false);

  const { setUserHelper } = useContext(globalContext);

  const navigate = useNavigate();

  const { contract } = useContract(
    "0x3532c319b13d3d867fE96f0AE0B02fC3BB79b5b2"
  );

  const account = useAddress();

  // To check if account exist or not
  const { data } = useContractRead(contract, "getIdentity", account);

  const { mutateAsync: addIdentity } = useContractWrite(
    contract,
    "addIdentity"
  );

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

  async function formSubmit(e) {
    e.preventDefault();
    var accExist = data;

    console.log(name, email, pass, type, add, account);
    if (accExist) {
      setAlert("Account Exist with current Wallet :" + account);
      console.log(alertMessage);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else if (
      name === "" ||
      email === "" ||
      pass === "" ||
      (type !== "Blood Bank" && type !== "Hospital") ||
      add === ""
    ) {
      setAlert("Complete the form");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
    // add to blockchain
    else {
      try {
        setLoading(true);
        let coords;
        // setting fixed coords due to non availibility of free geocoder
        if (type === "Blood Bank") {
          coords = "28.71154455678884,77.1556677910753";
        } else {
          coords = "28.527718654318228,77.21201605513441";
        }
        await addIdentity([name, account, email, pass, add, coords, type]);

        console.log("Registered Successfully");
        var curUser = {
          name: name,
          email: email,
          address: add,
          coords: coords,
          type: type,
        };
        setUserHelper(curUser);
        // redirect to home after registering
        if (type == "Blood Bank") navigate("/bloodbank-home");
        else navigate("/hospital-home");
      } catch (error) {
        console.log("User Registration Error: ", error);
      }
    }
  }

  if (!isLoading) {
    return (
      <>
        <CustomNavbar url="register" />
        <div className="wrapper">
          <div className="page-header" style={{}}>
            <div className="page-header-image" />
            <div className="content m-0  mt-5 p-5">
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
                        <Card.Title tag="h4">register</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Enter Org Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="email"
                              placeholder="Enter Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder="Enter Password"
                              value={pass}
                              onChange={(e) => setPass(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              className="mb-3"
                              as="textarea"
                              placeholder="Enter Address"
                              rows="2"
                              value={add}
                              onChange={(e) => setAdd(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Select
                              className="form-control"
                              value={type}
                              onChange={(e) => {
                                setType(e.target.value);
                              }}
                            >
                              <option value="">Select Org Type</option>
                              <option>Hospital</option>
                              <option>Blood Bank</option>
                            </Form.Select>
                          </Form.Group>
                        </Form>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-round"
                          color="primary"
                          size="lg"
                          onClick={formSubmit}
                        >
                          Get Started
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
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
  } else {
    return <Preloader />;
  }
}
