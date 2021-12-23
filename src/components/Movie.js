import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Grid from "./Grid";
import Actor from "./Actor";
import Spinner from "./Spinner";
// Hooks
import { useMovieFetch } from "../hooks/useMovieFetch";
// Image
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  const { movieId } = useParams();
  const { data, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong.</div>;

  return (
    <>
      <BreadCrumb movieTitle={data.original_title} />
      <MovieInfo movie={data} />
      <MovieInfoBar
        time={data.runtime}
        budget={data.budget}
        revenue={data.revenue}
      />
      <Grid header="Actors">
        {data.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
