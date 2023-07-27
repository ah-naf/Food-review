import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";



function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid place-content-center p-10">
        <h1 className="text-3xl md:text-4xl max-w-xl tracking-wide leading-10 text-center text-green-800 font-semibold">
          The Number <span className="bg-orange-300 ">#One</span> Choice For
          Your Hunger Solution
        </h1>
        <p className="text-center mt-2 font-light tracking-wide">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, minus.</p>
        <img src="looney.gif" alt="" className="w-full max-w-xl" />
        <button className="py-3 px-5 bg-orange-400 max-w-[200px] text-white font-medium rounded mx-auto">
          <Link to={"/explore"}>Browse Foods</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
