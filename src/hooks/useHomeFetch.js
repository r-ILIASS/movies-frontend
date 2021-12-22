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

  useEffect(() => {
    setData(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more movies
  useEffect(() => {
    if (!loadMoreMovies) return;

    fetchMovies(data.page + 1, searchTerm);
    setLoadMoreMovies(false);
  }, [loadMoreMovies, searchTerm, data.page]);

  return { data, searchTerm, setSearchTerm, setLoadMoreMovies, loading, error };
};
