import React, { useState, useEffect } from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Button from "./Button";
import Spinner from "./Spinner";

// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { data, searchTerm, setSearchTerm, setLoadMoreMovies, loading, error } =
    useHomeFetch();
  const { results } = data;

  if (error) return <div>Something went wrong.</div>;

  return (
    <>
      {!searchTerm && results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${results[0].backdrop_path}`}
          title={results[0].original_title}
          text={results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {data.page < data.total_pages && !loading && (
        <Button
          text="Load More Movies"
          callback={() => setLoadMoreMovies(true)}
        />
      )}
    </>
  );
};

export default Home;
