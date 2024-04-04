import {useEffect, useState} from "react";
import {Movie} from "../models/movies";

const useMovieById = (id: number | null): Movie | null => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/movies/${id}`,
                    { signal }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setMovie(data);
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching movies', error);
                }
            }
        };

        if (id) {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [id]);

    return movie;
}

export default useMovieById;
