import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import onemgLogo from "../assets/img/1mg.webp";
import sendEmail from "../dummyAPI/sendEmail";
import FetchFromAadhar from "../dummyAPI/fetchAadhar";
import { useLocation } from "react-router-dom";
export default function Redeem() {
  const account = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADD);
  const { data } = useContractRead(contract, "balanceOf", account);
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  // eslint-disable-next-line no-restricted-globals
  const donor = location.state;
  console.log(donor);
  function send() {
    var aadhar = donor.aadharNo;
    alert("Coupon Sent to Email");
    const data = {
      donor_email: FetchFromAadhar(aadhar).Email,
      donor_name: FetchFromAadhar(aadhar).Name,
      coupon_code: "AFASX2144",
      vendor: "1MG",
      coupon_price: 100,
    };

    sendEmail(data, "token");
  }

  return (
    <>
      <CustomNavbar />
      <div style={{ paddingTop: "100px" }} className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <Container className="mt-5 pt-5 align-items-center">
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <Card.Header>
                    <h2 className="title">Redeem</h2>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="home" title="Balance">
                          <div className="balanceContainer">
                            <h2>RBC: {parseInt(data)}</h2>
                          </div>
                        </Tab>
                        <Tab eventKey="profile" title="Redeem">
                          <div className="redeemContainer">
                            <Row className="align-items-center px-2">
                              <Col>
                                <img src={onemgLogo} alt="" />
                              </Col>
                              <Col>
                                <Web3Button
                                  accentColor="#1E3D8A"
                                  contractAddress={
                                    process.env.REACT_APP_CONTRACT_ADD
                                  }
                                  action={(contract) =>
                                    contract.call("burn", 10)
                                  }
                                  onSuccess={send}
                                >
                                  ₹100 Coupon
                                </Web3Button>
                              </Col>
                            </Row>
                            <Row className="align-items-center px-2">
                              <Col>
                                <img src={onemgLogo} alt="" />
                              </Col>
                              <Col>
                                <Web3Button
                                  accentColor="#1E3D8A"
                                  contractAddress={
                                    process.env.REACT_APP_CONTRACT_ADD
                                  }
                                  action={(contract) =>
                                    contract.call("burn", 50)
                                  }
                                  onSuccess={send}
                                >
                                  ₹500 Coupon
                                </Web3Button>
                              </Col>
                            </Row>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
