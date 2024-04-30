import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../models/movies';

const useFilteredMovieList = (): Movie[] => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const urlSearchParams = new URLSearchParams(location.search);
    const { search, sort, genre } = Object.fromEntries(urlSearchParams.entries());
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/movies?sortBy=${sort || ''}&sortOrder=asc&searchBy=title&search=${search || ''}&filter=${genre || ''}&limit=18`,
          { signal },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMovies(data.data);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching movies', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [location.search]);

  return movies;
};

export default useFilteredMovieList;
