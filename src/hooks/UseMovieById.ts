import {useEffect, useState} from "react";
import {Movie} from "../models/movies";
import {useParams} from "react-router-dom";
import {MovieStatus} from "../constants/url-queries-const";

const useMovieById = (): {movie: Movie | null, status: MovieStatus} => {
    const params = useParams();
    const movieId = params.movieId ?  Number(params.movieId) : null;
    const [result, setResult] = useState<{movie: Movie | null, status: MovieStatus}>({
        movie: null,
        status: movieId ? MovieStatus.Loading : MovieStatus.Ready
    });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/movies/${movieId}`,
                    { signal }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setResult({movie: data, status: MovieStatus.Ready});
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching movies', error);
                }
            }
        };

        if (movieId) {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [movieId]);

    return result;
}

export default useMovieById;
