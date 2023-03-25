import { Container } from "react-bootstrap";
import loader from "../assets/img/loader.gif";

const Preloader = () => {
  return (
    <Container className="preLoaderContainer">
      <img src={loader} alt="" srcset="" />
    </Container>
  );
};

export default Preloader;
