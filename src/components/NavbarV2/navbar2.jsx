import React from "react";
import Logo from '../Logo/logo';
import {db} from '../../instantDB/instantdb'
import { useNavigate } from "react-router-dom";
import './navbar2.css';

const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-15 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000">
      <div className="flex gap-2 items-center">

       <Logo />

      </div>

      <div className="flex items-center cursor-pointer">
        <div className="flex cursor-pointer outline px-3 py-1">
          <button onClick={() => {db.auth.signOut(); navigate("/");}} className="text-sm text-gray-500 cursor-pointer">Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
