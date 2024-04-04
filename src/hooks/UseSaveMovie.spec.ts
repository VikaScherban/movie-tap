import useSaveMovie from "./UseSaveMovie";
import {NewMovie} from "../models/movies";

describe('useSaveMovie', () => {
    let mockMovieData: NewMovie;

    beforeEach(() => {
        mockMovieData = {
            title: 'Test Movie',
            poster_path: 'https://example.com/poster',
            genres: ['Action', 'Adventure'],
            release_date: '2022-01-01',
            vote_average: 8.5,
            runtime: 120,
            overview: 'This is a test movie',
        };
    });

    it('should call fetch with the correct parameters when creating a movie', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true });

        const { createMovie } = useSaveMovie();
        await createMovie(mockMovieData);

        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(mockMovieData),
        });
    });

    it('should log success when creating a movie successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true });
        global.console.log = jest.fn();

        const { createMovie } = useSaveMovie();
        await createMovie(mockMovieData);

        expect(console.log).toHaveBeenCalledWith('Movie created successfully.');
    });

    it('should log error when creating a movie fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false });
        global.console.error = jest.fn();

        const { createMovie } = useSaveMovie();
        await createMovie(mockMovieData);

        expect(console.error).toHaveBeenCalledWith('Failed to create movie.');
    });

    it('should log error when an error occurs during movie creation', async () => {
        const mockError = new Error('Fetch error');
        global.fetch = jest.fn().mockRejectedValue(mockError);
        global.console.error = jest.fn();

        const { createMovie } = useSaveMovie();
        await createMovie(mockMovieData);

        expect(console.error).toHaveBeenCalledWith(
            'An error occurred while creating the movie:',
            mockError
        );
    });

    it('should call fetch with the correct parameters when updating a movie', async () => {
        const newMovie = {...mockMovieData, id: 123};
        global.fetch = jest.fn().mockResolvedValue({ ok: true });

        const { updateMovie } = useSaveMovie();
        await updateMovie(newMovie);

        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/movies', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(newMovie),
        });
    });

    it('should log success when updating a movie successfully', async () => {
        const newMovie = {...mockMovieData, id: 123};

        global.fetch = jest.fn().mockResolvedValue({ ok: true });
        global.console.log = jest.fn();

        const { updateMovie } = useSaveMovie();
        await updateMovie(newMovie);

        expect(console.log).toHaveBeenCalledWith('Movie updated successfully.');
    });

    it('should log error when updating a movie fails', async () => {
        const newMovie = {...mockMovieData, id: 123};
        global.fetch = jest.fn().mockResolvedValue({ ok: false });
        global.console.error = jest.fn();

        const { updateMovie } = useSaveMovie();
        await updateMovie(newMovie);

        expect(console.error).toHaveBeenCalledWith('Failed to update movie.');
    });

    it('should log error when an error occurs during movie update', async () => {
        const newMovie = {...mockMovieData, id: 123};
        const mockError = new Error('Fetch error');
        global.fetch = jest.fn().mockRejectedValue(mockError);
        global.console.error = jest.fn();

        const { updateMovie } = useSaveMovie();
        await updateMovie(newMovie);

        expect(console.error).toHaveBeenCalledWith(
            'An error occurred while updating the movie:',
            mockError
        );
    });
});
