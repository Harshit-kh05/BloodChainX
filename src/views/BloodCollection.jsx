import CustomNavbar from "../components/CustomNavbar";
import globalContext from "../context/GlobalUserContext";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FetchFromAadhar from "../dummyAPI/fetchAadhar";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Preloader from "../components/Preloader";
export default function BloodCollection() {
  const { user } = useContext(globalContext);
  const [data, setData] = useState({
    bloodId: "",
    aadharNo: "",
    bloodGroup: "",
    verified: false,
    collectionDate: new Date().toLocaleString().split(",")[0],
    location: "",
  });

  const [alertMessage, setAlert] = useState("");
  const [showAlert, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { contract } = useContract(
    "0x3532c319b13d3d867fE96f0AE0B02fC3BB79b5b2"
  );

  const { mutateAsync: addBloodUnit } = useContractWrite(
    contract,
    "addBloodUnit"
  );

  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  function inputChangeHandler(e) {
    const { name, value } = e.target;
    setData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  async function formSubmit(e) {
    e.preventDefault();
    console.log(data, user);
    var bloodExist = await contract.call("bloodExist", data.bloodId);

    if (data.bloodId === "" || data.aadharNo === "" || data.bloodGroup === "") {
      setAlert("complete the form");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else if (FetchFromAadhar(data.aadharNo) === undefined) {
      setAlert("Aadhar not present in database");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else if (bloodExist === true) {
      setAlert("Blood ID exists");
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    } else {
      try {
        setLoading(true);
        await addBloodUnit([
          data.bloodId,
          data.aadharNo,
          data.bloodGroup,
          // expiry
          new Date(Date.now() + 42 * 86400000)
            .toLocaleString("en-GB")
            .split(" ")[0],
          // to save blood bank name
          user.name,
          user.coords,
        ]);
        navigate("/bloodbank-home");
      } catch (err) {
        console.log("Error in creation");
      }
    }
  }

  if (!isLoading) {
    return (
      <>
        <CustomNavbar url="bloodBankHome" />
        <div style={{ paddingTop: "100px" }} className="wrapper">
          <div className="page-header header-filter">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <Container style={{ marginTop: "100px" }}>
              <Alert show={showAlert} variant="info">
                {alertMessage}
              </Alert>
              <Row>
                <Col></Col>
                <Col>
                  <Card className="card-register">
                    <Card.Header>
                      <Card.Img
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      />
                      <Card.Title tag="h4">Details</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group controlId="bloodIDInput">
                          <Form.Label>Blood ID</Form.Label>
                          <Form.Control
                            name="bloodId"
                            type="text"
                            placeholder="Blood ID"
                            value={data.bloodId}
                            onChange={inputChangeHandler}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="aadharNoInput">
                          <Form.Label>Aadhar No</Form.Label>
                          <Form.Control
                            name="aadharNo"
                            type="text"
                            placeholder="Aadhar No"
                            value={data.aadharNo}
                            onChange={inputChangeHandler}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="bloodGroupInput">
                          <Form.Label>Blood Group</Form.Label>
                          <Form.Select
                            className="form-control"
                            name="bloodGroup"
                            value={data.bloodGroup}
                            onChange={inputChangeHandler}
                          >
                            <option value="select">Select</option>
                            <option value="A +ve">A +ve</option>
                            <option value="A -ve">A -ve</option>
                            <option value="B +ve">B +ve</option>
                            <option value="B -ve">B -ve</option>
                            <option value="O +ve">O +ve</option>
                            <option value="O -ve">O -ve</option>
                            <option value="AB +ve">AB +ve</option>
                            <option value="AB -ve">AB -ve</option>
                          </Form.Select>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="mt-2"
                        type="submit"
                        onClick={formSubmit}
                      >
                        Submit
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  } else {
    return <Preloader />;
  }
}
