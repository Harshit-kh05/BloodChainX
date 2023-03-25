import { Badge, Button, Col, Container, Row } from "react-bootstrap";

export default function ProfileCard(props) {
  var isBank = props.type !== "Blood Bank" ? " d-none" : "";
  return (
    <Container className="align-items-center mb-0">
      <Row>
        <Col></Col>
        <Col lg="6" md="6">
          <h1 className="profile-title text-left">{props.name}</h1>
          <h6 className="text-on-back">
            {props.type === "Blood Bank" ? `Blood Bank` : `Hospital`}
          </h6>
          <p className="profile-description my-5 mx-auto">
            <Row>
              <Col>
                <Badge bg="info">Email: {props.email}</Badge>
              </Col>
              <Col>
                <Badge bg="info">Address: {props.add}</Badge>
              </Col>
            </Row>
          </p>
        </Col>
        <Col></Col>
      </Row>
      <div className={` mt-2 text-center ${isBank}`}>
        <h2>{props.type == "Blood Bank" ? "Available Blood" : ""}</h2>
      </div>
      <Row className={isBank}>
        <Col></Col>
        {Object.entries(props.bloodCount).map(([key, value], i) => (
          <>
            <Col>
              <div className={`ml-auto mr-auto my-5`}>
                <Badge bg={parseInt(value) > 0 ? "success" : "danger"}>
                  <h2 className="font-weight-bold mb-1">{value}</h2>
                  <p className="font-weight-bold">{key}</p>
                </Badge>
              </div>
            </Col>
          </>
        ))}
        <Col></Col>
      </Row>
    </Container>
  );
}
