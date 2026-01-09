import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import Logo from "../../components/Logo/logo";

const LandingPage = () => {
  return (
    <div className="py-[50px] bg-gray-100 h-screen flex flex-col items-center justify-center">
      <Logo />

      <div className="my-4">
        <Link
          to={"/login"}
          className="hover:bg-orange-700 bg-orange-600 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2 w-99 block my-3"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
