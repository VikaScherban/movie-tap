import {Movie, NewMovie, SaveMovieData} from "../models/movies";

const REQUEST_PATH = 'http://localhost:4000/movies';

const useSaveMovie = (): SaveMovieData => {
    const createMovie = async (movieData: NewMovie): Promise<void> => {
        try {
            const response = await fetch(REQUEST_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (response.ok) {
                console.log('Movie created successfully.');
            } else {
                console.error('Failed to create movie.');
            }
        } catch (error) {
            console.error('An error occurred while creating the movie:', error);
        }
    };

    const updateMovie = async (movieData: Movie): Promise<void> => {
        try {
            const response = await fetch(REQUEST_PATH, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (response.ok) {
                console.log('Movie updated successfully.');
            } else {
                console.error('Failed to update movie.');
            }
        } catch (error) {
            console.error('An error occurred while updating the movie:', error);
        }
    };

    return {createMovie, updateMovie};
}

export default useSaveMovie;
