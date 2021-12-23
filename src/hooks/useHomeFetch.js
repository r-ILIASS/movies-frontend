import { useState, useEffect } from "react";
// API
import API from "../API";
// Helpers
import { isPersistedState } from "../helpers";

// Initial state structured like the data we get from the TMDBserver
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [data, setData] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMoreMovies, setLoadMoreMovies] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setData((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial & search requests
  useEffect(() => {
    if (!searchTerm) {
      // read movie data from session storage
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        setData(sessionState);
        return;
      }
    }

    setData(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more movies
  useEffect(() => {
    if (!loadMoreMovies) return;

    fetchMovies(data.page + 1, searchTerm);
    setLoadMoreMovies(false);
  }, [loadMoreMovies, searchTerm, data.page]);

  // Write to session storage
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(data));
  }, [searchTerm, data]);

  return { data, searchTerm, setSearchTerm, setLoadMoreMovies, loading, error };
};
