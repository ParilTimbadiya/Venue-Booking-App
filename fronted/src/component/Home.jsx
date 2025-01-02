import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          src="src/assets/images/home-img.jpg"
          className="img-fluid"
          width="300"
          height="300"
          alt="Home Icon"
        />
        <p className="h1 mt-0">
          Welcome to <span className="text-success">Noob's Cricboard</span>
        </p>
        <p className="text-secondary h4">Manage cricket matches on your touch</p>

        <Link to="/details">
          <button
            id="home-nm"
            className="mt-3 mx-1 btn btn-lg btn-primary rounded-pill"
          >
            New match
          </button>
        </Link>
        <button
          id="home-rm"
          className="d-none mt-3 mx-1 btn btn-lg btn-success rounded-pill"
        >
          Running Match
        </button>
        <Link to="/venue">
        <button className="mt-3 mx-1 btn btn-lg btn-warning rounded-pill">
          Book Venue
        </button>
          </Link>
      </div>
    </>
  );
};

export default Home;
