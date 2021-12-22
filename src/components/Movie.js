import React from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { movieId } = useParams();

  return <div>{`movie: ${movieId}`}</div>;
};

export default Movie;
