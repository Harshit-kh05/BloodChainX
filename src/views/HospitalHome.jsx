import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FormSelect,
  Modal,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar";

import { useContext, useEffect, useRef, useState } from "react";

import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";
import globalContext from "../context/GlobalUserContext";

import FetchFromAadhar from "../dummyAPI/fetchAadhar";
import GetDistance from "../dummyAPI/GetDistance";

import { sha256 } from "js-sha256";
import QrReader from "react-qr-reader";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function HospitalHome(props) {
  const { contract } = useContract(
    "0x3532c319b13d3d867fE96f0AE0B02fC3BB79b5b2"
  );

  const { mutateAsync: transferAsset } = useContractWrite(
    contract,
    "transferAsset"
  );
  const { user } = useContext(globalContext);

  const [bloodToBeSearched, setBloodToBeSearched] = useState({
    selectedBloodGroup: "select",
  });

  const [foundBloodData, setFoundBlood] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [bloodbankCord, updateBloodbankCord] = useState();

  const qrRef = useRef(null);
  const [code, setCode] = useState("");
  const [hash, setHash] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setBloodToBeSearched((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleUpload() {
    console.log(qrRef);
    if (qrRef && qrRef.current) qrRef.current.openImageDialog();
  }

  function handleScan(data) {
    if (data) {
      setCode(data);
    }
    console.log("data", qrRef);
    // reader.current.reader.result
    console.log("data", qrRef.current.reader.result);
    var h = foundBloodData.aadharNo
      .replaceAll(" ", "")
      .concat(foundBloodData.uniqueID);
    console.log("h", h);
    setHash(sha256(h));
    console.log("hash", hash);
    console.log("code", code);
    // alert(code)
  }

  function handleError(err) {
    console.error(err);
  }

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    if (bloodToBeSearched.selectedBloodGroup !== "select") {
      var b_count = parseInt(await contract.call("getBloodCount"));
      var reqBlood = []; // multidimensioanl array with blood if distanct coords

      for (let i = 1; i <= b_count; ++i) {
        const bloodData = await contract.call("getBloodData", i);
        const bloodStatusCount = parseInt(
          await contract.call("getBloodStatusCount", i)
        );

        const bloodStatus = await contract.call(
          "getBloodStatus",
          i,
          bloodStatusCount
        );
        var bloodGroup = bloodData[2];
        var owner = bloodStatus[2];
        var verified = bloodStatus[3];
        var bloodCoords = bloodStatus[1].split(",");
        var userCoords = user.coords.split(",");

        // checking if bloodGroup is same as req , its in blood bank and is safe
        if (
          bloodToBeSearched.selectedBloodGroup == bloodGroup &&
          verified == "1" &&
          owner.toString().toLowerCase().includes("blood")
        ) {
          let dis = GetDistance(
            parseFloat(bloodCoords[0]),
            parseFloat(userCoords[0]),
            parseFloat(bloodCoords[1]),
            parseFloat(userCoords[1])
          );
          reqBlood.push([
            i, //blood id,
            parseInt(dis),
            bloodStatus[1], // coordinates of blood bank
            owner, // name of blood bank
          ]);
        }
      }

      if (reqBlood.length == 0) {
        setLoading(false);
        alert("Blood Not Found");
        return;
      }

      // sort on distance

      reqBlood.sort((a, b) => {
        return a[1] < b[1];
      });

      updateBloodbankCord(bloodCoords[0] + "," + bloodCoords[1]);

      var nearestBlood = reqBlood[0];
      console.log(nearestBlood);
      // get detail of nearest blood

      var nearestBloodData = await contract.call(
        "getBloodData",
        nearestBlood[0]
      );

      var nearestBloodStatusCount = await contract.call(
        "getBloodStatusCount",
        nearestBlood[0]
      );
      var nearestBloodStatus = await contract.call(
        "getBloodStatus",
        nearestBlood[0],
        nearestBloodStatusCount
      );

      var foundBloodTemp = {
        id: nearestBlood[0],
        uniqueID: nearestBloodData[0],
        email: FetchFromAadhar(nearestBloodData[1])["Email"],
        name: FetchFromAadhar(nearestBloodData[1])["Name"],
        aadharNo: nearestBloodData[1],
        bloodGroup: nearestBloodData[2],
        age: FetchFromAadhar(nearestBloodData[1])["Age"],
        expiryDate: nearestBloodData[3],
        currentBloodBank: nearestBloodStatus[2],
        verified: "1",
      };

      setFoundBlood(foundBloodTemp);
      console.log(foundBloodTemp);

      setLoading(false);
      setModal(true);
    } else {
      alert(`${"Please Select a Blood Group"}`);
      setLoading(false);
    }
  }

  async function transferBlood() {
    console.log(
      "Transfer from : ",
      foundBloodData.currentBloodBank,
      " To : ",
      user.name
    );

    await transferAsset([
      foundBloodData.id,
      foundBloodData.currentBloodBank,
      "1",
      user.coords,
      user.name,
    ]).then(() => {
      setModal(false);
      alert("Blood Transfer Successfully");
    });
  }

  useEffect(() => {
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("profile-page");
    };
  }, []);

  return (
    <>
      <CustomNavbar url="hospitalHome" />
      <div className="wrapper p-10 mb-2">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("../assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("../assets/img/path4.png")}
          />
          <ProfileCard
            name={user.name}
            type={user.add}
            bloodCount={{}}
            email={user.email}
            add={user.add}
          />
          <Container className="hospitalContainer pt-5 text-center">
            <h2>Ask For Blood</h2>
            <Row>
              <Col></Col>
              <Col className="searchContainer" style={{ zIndex: "99" }}>
                <h3>Blood Group of Patient :</h3>
                <FormSelect
                  className="form-control my-3"
                  name="selectedBloodGroup"
                  value={bloodToBeSearched.selectedBloodGroup}
                  onChange={handleChange}
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
                </FormSelect>
                <Button className="mt-3" onClick={search}>
                  {!loading ? "Search for Blood " : "Searching For Blood"}
                </Button>
                {modal && (
                  <Modal show={modal} toggle={() => setModal(false)}>
                    <div className="modal-header justify-content-center pt-0">
                      <h4 className="title title-up">Blood Details</h4>
                    </div>
                    <Modal.Body style={{ color: "black" }}>
                      <p className="px-3 text-justify">
                        Following are the details of the blood you will receive.
                        please verify the hash once blood is recieved
                      </p>
                      <div className="px-3 pt-2">
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Name:</b>
                            {foundBloodData.name}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Email ID:</b>
                            {foundBloodData.email}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Aadhar No: </b>
                            {foundBloodData.aadharNo}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Blood ID: </b>
                            {foundBloodData.uniqueID}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Blood Group: </b>
                            {foundBloodData.bloodGroup}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Received from : </b>
                            {foundBloodData.currentBloodBank}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Expiry Date : </b>
                            {foundBloodData.expiryDate}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Age: </b>
                            {foundBloodData.age}
                          </h5>
                        </div>
                        <div>
                          <h5 style={{ color: "black" }}>
                            <b className="mr-4">Verification Status: </b>
                            {foundBloodData.verified === "0" && (
                              <Badge
                                bg="warning"
                                className="py-1"
                                style={{ color: "black" }}
                              >
                                Not yet Tested
                              </Badge>
                            )}

                            {foundBloodData.verified === "1" && (
                              <Badge bg="success" className="py-1">
                                Tested {"&"} Safe
                              </Badge>
                            )}

                            {foundBloodData.verified === "2" && (
                              <Badge bg="danger" className="py-1">
                                Tested {"&"} Unsafe
                              </Badge>
                            )}
                          </h5>
                        </div>
                        <div>
                          <h5 class="card-title">
                            <b className="mr-4 ">
                              <a
                                target="1"
                                href={
                                  "http://google.com/maps?q=" +
                                  bloodbankCord +
                                  "&ll=" +
                                  bloodbankCord +
                                  "&z=20"
                                }
                              >
                                See on Maps:{" "}
                              </a>
                            </b>
                            <div className="row justify-content-center  mt-2">
                              <iframe
                                style={{ borderStyle: "solid" }}
                                borderStyle="solid"
                                title="maps"
                                src={
                                  "http://google.com/maps?q=" +
                                  bloodbankCord +
                                  "&ll=" +
                                  bloodbankCord +
                                  "&z=20&output=embed"
                                }
                                height="300"
                                width="420"
                              ></iframe>
                            </div>
                          </h5>
                        </div>
                      </div>
                    </Modal.Body>
                    <div className="modal-footer mb-3">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleUpload}
                      >
                        Scan and Check
                      </Button>
                      {code && code === hash && (
                        <Button onClick={transferBlood}>Transfer</Button>
                      )}
                      <Button
                        variant="dark"
                        onClick={() => {
                          setModal(false);
                          setCode("");
                          setHash("");
                        }}
                      >
                        Close
                      </Button>
                    </div>
                    <Row>
                      <Col>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          onError={handleError}
                          // style={{ width: "40%" }}
                          onScan={handleScan}
                          legacyMode={true}
                        />
                      </Col>
                      <Col>
                        {code && (
                          <div className="row px-3">
                            <div className="col m-3">
                              <h6 style={{ color: "black" }}>Hash from QR :</h6>
                              {code && (
                                <span>{code.substring(0, 15) + " ..."}</span>
                              )}
                              <hr />
                              <h6 style={{ color: "black" }}>
                                Hash generated :{" "}
                              </h6>
                              {hash && (
                                <span>{hash.substring(0, 15) + " ..."}</span>
                              )}
                              <hr />
                              {code === hash && (
                                <Badge bg="success" className="py-1">
                                  Hash verification successful
                                </Badge>
                              )}

                              {code !== hash && (
                                <Badge bg="danger" className="py-1">
                                  Hash verification unsuccessful
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Modal>
                )}
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
