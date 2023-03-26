import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import Typed from "typed.js";

export default function Landing() {
  // for typing effect
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Transparency", "Security", "Reliability"],
      typeSpeed: 50,
      backSpeed: 50,
    });
    document.body.classList.add("landing-page");

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <>
      <CustomNavbar url="home" />
      <div className="wrapper">
        <div className="page-header" style={{ background: "red" }}>
          <img
            style={{ opacity: 0.2 }}
            alt="..."
            className="path2"
            src={require("../assets/img/path2.png")}
          />
          <img
            style={{ opacity: 0.3 }}
            alt="..."
            className="shapes triangle"
            src={require("../assets/img/triunghiuri.png")}
          />
          <img
            style={{ opacity: 0.5 }}
            alt="..."
            className="shapes wave"
            src={require("../assets/img/waves.png")}
          />
          <img
            style={{ opacity: 0.2 }}
            alt="..."
            className="shapes squares"
            src={require("../assets/img/patrat.png")}
          />
          <img
            style={{ opacity: 0.2 }}
            alt="..."
            className="shapes circle"
            src={require("../assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  We keep your Blood <br />
                  <span className="text-white">secured</span>
                </h1>
                <p className="text-white mb-3">
                  The National Informatics Centre reports that a significant
                  portion (90%) of blood donations in India take place at blood
                  donation camps hosted by various organizations. The donated
                  blood is screened to ensure its safety, but there is a
                  possibility that unsafe blood can still make its way into the
                  system and harm patients. To mitigate this risk, we aim to
                  utilize the power of blockchain technology to reinforce the
                  reliability of the blood donation process and minimize the
                  likelihood of such incidents.
                </p>
              </Col>
              <Col lg={4} md="5">
                <Row>
                  <Col lg={12}>
                    <h1 style={{ textDecoration: "underline" }}>
                      Rakt Daan Plus
                    </h1>
                  </Col>
                  <Col lg={12}>
                    <span style={{ fontSize: "30px" }} ref={el} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <section
          className="section section-lg"
          style={{ padding: "0 10px", background: "#f4f5f7" }}
        >
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("../assets/img/path4.png")}
            />
          </section>
        </section>
        <section
          className="section section-lg"
          style={{ background: "#f4f5f7" }}
        >
          <img
            alt="..."
            className="path"
            src={require("../assets/img/path4.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("../assets/img/path5.png")}
          />
          <img
            alt="..."
            className="path3"
            src={require("../assets/img/path2.png")}
          />
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center" style={{ color: "#344675" }}>
                  Our Solution Ensures
                </h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info" style={{ paddingTop: "10px" }}>
                      <div className="icon icon-info">
                        <i className="tim-icons icon-money-coins" />
                      </div>
                      <h3 className="info-title">Transparency</h3>
                      <hr className="line-info" />
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        We ensure that the distribution of blood is transparent
                        and publicly accessible to everyone, using blockchain
                        technology.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info" style={{ paddingTop: "10px" }}>
                      <div className="icon icon-default">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h3 className="info-title">Reliability</h3>
                      <hr className="line-default" />
                      <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        We ensures to make our platform reliable, so that the
                        safe blood is accessible to everyone all the time by
                        storing data on a decentralised system.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info" style={{ paddingTop: "10px" }}>
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h3 className="info-title">Security</h3>
                      <hr className="line-success" />
                      <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        We provide a secure platform for transfer and data
                        storage of blood units, using blockchain and smart
                        contract technology.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
}
