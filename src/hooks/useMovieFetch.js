import { useState, useEffect, useCallback } from "react";
// API
import API from "../API";
// Helpers
import { isPersistedState } from "../helpers";

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
    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setData(sessionState);
      setLoading(false);
      return;
    }

    fetchData();
  }, [movieId]);

  // Write to session storage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(data));
  }, [movieId, data]);

  return { data, loading, error };
};
