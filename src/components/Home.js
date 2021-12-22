import React, { useState, useEffect } from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components

// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { data, loading, error } = useHomeFetch();

  console.log("data ", data);
  return <div>Home Page</div>;
};

export default Home;
