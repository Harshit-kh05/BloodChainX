import { Container, Badge, Button, Card } from "react-bootstrap";
import FetchFromAadhar from "../dummyAPI/fetchAadhar";

export default function DonarCard(props) {
  const person = FetchFromAadhar(props.no);
  console.log(props);
  return (
    <Container className="donorCard">
      <Card className="card-donor">
        <Card.Header>
          <Card.Img
            alt="..."
            src={require("../assets/img/square-purple-1.png")}
          />
          <Card.Title>Donor Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <b>Name : {person.Name}</b>
          <br />
          <b>Date of Donation : {props.collectionDate}</b>
          <br />
          <b>Blood ID : {props.bloodID}</b>
          <br />
          <b>Blood Group : {props.bloodGroup}</b>
          <br />
          {props.verified === "0" && (
            <span>
              <b>Verified : </b>
              <Badge
                bg="warning"
                className="py-1"
                style={{ fontSize: "0.6rem" }}
              >
                Not Verified
              </Badge>
            </span>
          )}

          {props.verified === "1" && (
            <span>
              <b>Status : </b>
              <Badge
                bg="success"
                className="py-1"
                style={{ fontSize: "0.6rem" }}
              >
                Tested {"&"} Safe
              </Badge>
            </span>
          )}

          {props.verified === "2" && (
            <span>
              <b>Status : </b>
              <Badge bg="danger" className="py-1">
                Tested {"&"} Unsafe
              </Badge>
            </span>
          )}
        </Card.Body>
        <Card.Footer>
          <Button className="d-block mt-2" onClick={props.onClick}>
            Edit Details
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
