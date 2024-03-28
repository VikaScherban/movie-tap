import { renderHook, waitFor } from '@testing-library/react';
import {Movie} from "../models/movies";
import useMovieById from "./UseMovieById";
describe('useFilteredMovieList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
        console.log = jest.fn();
    });

    it('should fetch and return movies', async () => {
        const mockData: Movie = { id: 2, title: 'Movie2', genres: ['genre2'], vote_average: 5.6, runtime: 234, overview: 'Test 2', release_date: "12-11-2000", poster_path: 'http://test2.png' };

        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({ok: true, json: () => Promise.resolve(mockData)})
        );

        const { result } = renderHook(() =>
            useMovieById(2)
        );

        expect(result.current).toEqual(null);

        await waitFor(() => expect(result.current).toEqual(mockData));

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle error on response not ok', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) })
        );

        const { result } = renderHook(() =>
            useMovieById(1)
        );

        await waitFor(() => expect(console.error).toBeCalled());

        expect(result.current).toEqual(null);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(console.error).toBeCalledWith('Error fetching movies', new Error('HTTP error! status: 500'));
    });

    it('should handle fetch error', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

        renderHook(() => useMovieById(3));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching movies', new Error('Fetch error'));
        });
    });
});
