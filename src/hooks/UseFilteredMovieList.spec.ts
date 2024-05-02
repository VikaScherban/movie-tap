import { renderHook, waitFor } from '@testing-library/react';
import { Movie } from '../models/movies';
import useFilteredMovieList from './UseFilteredMovieList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => jest.fn(),
}));
describe('useFilteredMovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    console.log = jest.fn();
  });

  it('should fetch and return movies', async () => {
    const mockData: Movie[] = [
      {
        id: 1, title: 'Movie1', genres: ['genre1'], vote_average: 3.6, runtime: 123, overview: 'Test', release_date: '10-05-2012', poster_path: 'http://test.png',
      },
      {
        id: 2, title: 'Movie2', genres: ['genre2'], vote_average: 5.6, runtime: 234, overview: 'Test 2', release_date: '12-11-2000', poster_path: 'http://test2.png',
      },
    ];

    // @ts-ignore
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: mockData }) }));

    const { result } = renderHook(() => useFilteredMovieList());

    expect(result.current).toEqual([]);

    await waitFor(() => expect(result.current).toEqual(mockData));

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle error on response not ok', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) }));

    const { result } = renderHook(() => useFilteredMovieList());

    await waitFor(() => expect(console.error).toBeCalled());

    expect(result.current).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(console.error).toBeCalledWith('Error fetching movies', new Error('HTTP error! status: 500'));
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    renderHook(() => useFilteredMovieList());

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching movies', new Error('Fetch error'));
    });
  });
});
