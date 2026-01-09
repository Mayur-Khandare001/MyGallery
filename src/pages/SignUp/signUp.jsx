import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/logo";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";

const SignUp = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10">
        <Logo />

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Email "
              name=""
              id=""
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Password "
              name=""
              id=""
            />
          </div>

          <div>
            <label htmlFor="f_name">Full name</label>
            <input
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Full name "
              name=""
              id=""
            />
          </div>

          <div className="w-full hover:bg-orange-700 bg-orange-600 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2">
            Register
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="border-b-1 border-gray-400 w-[45%]" />
          <div>or</div>
          <div className="border-b-1 border-gray-400 w-[45%] my-6" />
        </div>

        <GoogleLoginComp />
      </div>

      <div className="mt-4 mb-10">
        Have an account{" "}
        <Link to="/login" className="text-blue-800 cursor-pointer">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
