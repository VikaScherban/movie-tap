import {useEffect, useState} from "react";
import {Movie} from "../models/movies";

const useFilteredMovieList = (sortBy: string, search: string, activeGenre: string): Movie[] => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=asc&searchBy=title&search=${search}&filter=${activeGenre}&limit=18`, { signal: signal });
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
    }, [sortBy, search, activeGenre]);

    return movies;
}

export default useFilteredMovieList;
