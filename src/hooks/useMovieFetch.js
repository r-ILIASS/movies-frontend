import { useState, useEffect, useCallback } from "react";
import API from "../API";

export const useMovieFetch = (movieId) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );

      setData({
        ...movie,
        actors: credits.cast,
        directors,
      });
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    fetchData();
  }, [movieId]);

  return { data, loading, error };
};
