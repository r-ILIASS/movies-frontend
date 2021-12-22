import { useState, useEffect } from "react";
// API
import API from "../API";

// Initial state structured like the data we get from the TMDBserver
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setData((prev) => ({
        ...movies,
        results: page > 1 ? [...prev.results, ...movies] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  return { data, loading, error };
};
