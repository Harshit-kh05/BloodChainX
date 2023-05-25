import { useEffect, useState } from "react";
import { Container, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useContract } from "@thirdweb-dev/react";
import Preloader from "../components/Preloader";
import CustomNavbar from "../components/CustomNavbar";

function Track() {
  const location = useLocation();

  const donor = location.state;
  const { contract } = useContract(
    "0x3532c319b13d3d867fE96f0AE0B02fC3BB79b5b2"
  );

  const [data, setData] = useState("");
  var tempData = [];

  async function fetchData() {
    let count = parseInt(donor.bloodStatusCount._hex);
    console.log("chala", count, donor);
    for (var i = 1; i <= count; i++) {
      var statusData = await contract.call(
        "getBloodStatus",
        parseInt(donor.id),
        i
      );
      tempData.push({
        data: statusData[0],
        Location: statusData[2],
        verified: parseInt(statusData[3]),
      });
    }
    setData(tempData);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data) {
    return (
      <>
        <CustomNavbar />
        <Container className="text-center mt-5">
          <h1>Blood Journey of {donor.name}</h1>
          <VerticalTimeline>
            {data.map((d) => {
              console.log(d);
              return (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                >
                  <h3 className="vertical-timeline-element-title">
                    Location : {d.Location}
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    {d.verified === 0 && (
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

                    {d.verified === 1 && (
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

                    {d.verified === 2 && (
                      <span>
                        <b>Status : </b>
                        <Badge bg="danger" className="py-1">
                          Tested {"&"} Unsafe
                        </Badge>
                      </span>
                    )}
                  </h4>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </Container>
      </>
    );
  } else {
    return <Preloader />;
  }
}

export default Track;
