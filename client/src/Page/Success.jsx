import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div>
      <Navbar />
      <div className="grid place-content-center mt-8 text-center">
        <img src="payment.png" alt="" className="w-80" />
        <h1 className="text-3xl font-semibold mt-4">Payment Successful</h1>
        <button className="bg-orange-500 py-2 w-40 mx-auto text-white rounded-xl font-medium mt-4">
            <Link to={'/'}>Go Back</Link>
        </button>
      </div>
    </div>
  );
}

export default Success;
