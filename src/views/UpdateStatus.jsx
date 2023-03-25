import globalContext from "../context/GlobalUserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import QRCode from "qrcode";
import CustomNavbar from "../components/CustomNavbar";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Preloader from "../components/Preloader";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import sendEmail from "../dummyAPI/sendEmail";

export default function UpdateStatus(props) {
  const { user } = useContext(globalContext);

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const { contract } = useContract(
    "0x6d67c2855C7212bcDb0b668917D7C58497aE0661"
  );

  const { mutateAsync: transferAsset } = useContractWrite(
    contract,
    "transferAsset"
  );

  const { mutateAsync: transfer } = useContractWrite(contract, "transfer");

  const donor = location.state;

  async function formSubmit(e, status) {
    console.log(donor);
    e.preventDefault();

    donor.verified = status;
    if (true) {
      // alert(`${JSON.stringify(props.location.state)}`);
      // add to blockchain

      //defining email data for accepted = true
      if (status) {
        // change verified to true and add changed data in blockchain
        try {
          setLoading(true);
          console.log(
            donor.id,
            donor.currentBloodBank,
            1,
            user.coords,
            donor.currentBloodBank
          );
          await transferAsset([
            donor.id,
            donor.currentBloodBank,
            1,
            user.coords,
            donor.currentBloodBank,
          ]);
          
          // sending token to donor
          const data = await transfer([donor.walletAddress, 10]);
          console.info("contract call successs", data);
          // sending email 
          const emaildata = {
            donor_email: donor.email,
            donor_name: donor.name,
          
          };
          sendEmail(emaildata,"safe")
        } catch (err) {
          console.log("Error in Transfer function", err);
        }
        // ---------- Generating and downloading QR code
        console.log(
          "Generating QR code of",
          donor.adharNo.replaceAll(" ", "").concat(donor.bloodId)
        );
        try {
          const qrCodeURL = (
            await QRCode.toDataURL(
              sha256(donor.adharNo.replaceAll(" ", "").concat(donor.bloodId))
            )
          ).replace("image/png", "image/octet-stream");
          console.log(qrCodeURL);
          let aEl = document.createElement("a");
          aEl.href = qrCodeURL;
          aEl.download = donor.name + "_QR_Code.png";
          document.body.appendChild(aEl);
          aEl.click();
          document.body.removeChild(aEl);
        } catch (error) {
          console.log(error);
        }
        // ----------

        navigate({
          pathname: "/bloodbank-home",
          state: {
            card_id_to_be_changed: donor.cardId,
            value: 1,
            entireData: donor.entireData,
            countdict: donor.countdict,
          },
        });
      } else {
        try {
          setLoading(true);
          await transferAsset([
            donor.id,
            donor.currentBloodBank,
            2,
            user.coords, // Enter real blood bank location instead of this values
            donor.currentBloodBank,
          ]);
        } catch (err) {
          console.log("Error in Transfer function", err);
        }
        navigate({
          pathname: "/bloodbank-home",
          state: {
            card_id_to_be_changed: donor.cardId,
            value: 2,
            entireData: donor.entireData,
            countdict: donor.countdict,
          },
        });
      }
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  }

  if (!isLoading) {
    return (
      <Container fluid className="editContainer">
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
              <Row>
                <Col></Col>
                <Col lg={5}>
                  <Card className="card-register" style={{ width: "500px" }}>
                    <Card.Header>
                      <Card.Img
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      />
                      <Card.Title tag="h4">Details</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <p>Email : {donor.email}</p>
                        </Col>
                        <Col>
                          <p> Aadhar No : {donor.adharNo}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>Blood ID : {donor.bloodId}</p>
                        </Col>
                        <Col>
                          <p>Age : {donor.age}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>Collection Date : {donor.collectionDate}</p>
                        </Col>
                        <Col>
                          <p>Expiry Date : {donor.expiryDate}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>Blood Group : {donor.bloodGroup}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                        <Col lg={7}>
                          <p>
                            Verification Status :
                            {donor.verified === "0" && (
                              <Badge bg="warning" className="py-1">
                                Not yet Tested
                              </Badge>
                            )}
                            {donor.verified === "1" && (
                              <Badge bg="success" className="py-1">
                                Tested {"&"} Safe
                              </Badge>
                            )}
                            {donor.verified === "2" && (
                              <Badge bg="danger" className="py-1">
                                Tested {"&"} Unsafe
                              </Badge>
                            )}
                          </p>
                        </Col>
                        <Col></Col>
                      </Row>

                      <Row>
                        <Col>
                          <Button
                            className="btn-round ml-auto mr-auto"
                            variant="success"
                            size="lg"
                            onClick={(e) => {
                              formSubmit(e, true);
                            }}
                          >
                            Change status to Tested {"&"} Safe
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            className="btn-round ml-auto mr-auto"
                            variant="danger"
                            size="lg"
                            onClick={(e) => {
                              formSubmit(e, false);
                            }}
                          >
                            Change status to Tested {"&"} UnSafe
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        </div>
      </Container>
    );
  } else {
    return <Preloader />;
  }
}
