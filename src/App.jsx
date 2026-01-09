import Navbar1 from "./components/NavbarV1/navbar1.jsx";
import LandingPage from "./pages/LandingPage/landingPage.jsx";
import Footer from "./components/Footer/footer.jsx";
import SignUp from "./pages/SignUp/signUp.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login.jsx";
import Navbar2 from "./components/NavbarV2/navbar2.jsx";
import React from "react";
import Gallery from "./pages/Gallery/gallery.jsx";
import Photo from "./pages/Photo/photo.jsx";
import { db } from "./instantDB/instantdb.jsx";

function App() {


  return (
    <div className="bg-gray-100 w-[100%] h-[100%] box-border">

      <Routes>
        <Route path="/" element={<><db.SignedOut><LandingPage /></db.SignedOut><db.SignedIn><Navigate to="/gallery" /></db.SignedIn></>} />
        <Route path="/login" element={<><db.SignedOut><Login /></db.SignedOut><db.SignedIn><Navigate to="/gallery" replace /></db.SignedIn></>} />
        <Route path="/gallery" element={<db.SignedIn><Gallery /></db.SignedIn>} />
        <Route path="/photo" element={<db.SignedIn><Photo /></db.SignedIn>} />
      </Routes>

    </div>
  );
}

export default App;
