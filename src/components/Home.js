import React, { useState, useEffect } from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";

// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { data, loading, error } = useHomeFetch();
  const { results } = data;

  console.log(data);
  return (
    <>
      {results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${results[0].backdrop_path}`}
          title={results[0].original_title}
          text={results[0].overview}
        />
      ) : null}
      <Grid header="Popular Movies">
        {results.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </Grid>
    </>
  );
};

export default Home;
