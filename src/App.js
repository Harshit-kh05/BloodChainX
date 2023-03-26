import { useSDK } from "@thirdweb-dev/react";
import "./assets/css/nucleo-icons.css";
import "./assets/css/scss/blk-design-system-react.scss";
import "./assets/css/demo.css";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import UserState from "./context/UserState";
import Landing from "./views/Landing";
import LoginDonor from "./views/DonorLogin";
import Login from "./views/Login";
import Register from "./views/Register";
import BloodbankHome from "./views/BloodbankHome";
import BloodCollection from "./views/BloodCollection";
import UpdateStatus from "./views/UpdateStatus";
import HospitalHome from "./views/HospitalHome";
import Track from "./views/Track";
import TrackLogin from "./views/TrackLogin";
import Redeem from "./views/Redeem";

export default function Home() {
  const sdk = useSDK();

  return (
    <UserState>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login-donor" element={<LoginDonor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bloodbank-home" element={<BloodbankHome />} />
        <Route path="/blood-collection" element={<BloodCollection />} />
        <Route path="/update-status" element={<UpdateStatus />} />
        <Route path="/hospital-home" element={<HospitalHome />} />
        <Route path="/login-track" element={<TrackLogin />} />
        <Route path="/redeem" element={<Redeem />} />
      </Routes>
    </UserState>
  );
}
