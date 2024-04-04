import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieDetails from './MovieDetails';
import {GenreTitle} from "../../../constants/genres-const";
import useMovieById from "../../../hooks/UseMovieById";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import {MovieStatus} from "../../../constants/url-queries-const";

jest.mock('../../../hooks/UseMovieById', () => jest.fn());
jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn()
}));
jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faSearch: jest.fn()
}));

describe('MovieDetails', () => {
  beforeEach(() => {
    // @ts-ignore
    useMovieById.mockReturnValue({movie: {
      id: 1,
      title: 'Example Movie',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      release_date: '2022-01-01',
      runtime: 120,
      vote_average: 8.5,
      poster_path: 'https://example.com/movie-poster.png',
      overview: 'Mock movie overview',
    }, status: MovieStatus.Ready});

    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      navigateTo: jest.fn()
    });

    // @ts-ignore
    FontAwesomeIcon.mockReturnValue(<span data-testid="search-icon" />);
  });

  it('renders the movie details correctly', () => {
    render(<MovieDetails />);

    expect(screen.queryByText('No movie selected')).not.toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Example Movie' })).toBeInTheDocument();
    expect(screen.getByText('Example Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('Horror, Documentary')).toBeInTheDocument();
    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('2h 0min')).toBeInTheDocument();
    expect(screen.getByText('Mock movie overview')).toBeInTheDocument();
  });

  it('renders the search icon button and handles the goBack function', () => {
    const navigateToSpy = jest.fn();
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      navigateTo: navigateToSpy
    });

    render(<MovieDetails />);

    const searchIcon = screen.getByTestId('search-button');
    expect(searchIcon).toBeInTheDocument();

    fireEvent.click(searchIcon);
    expect(navigateToSpy).toHaveBeenCalledWith('/');
  });

  it('renders "No movie selected" when movie is null', () => {
    // @ts-ignore
    useMovieById.mockReturnValue({movie: null, status: MovieStatus.Ready});

    render(<MovieDetails />);

    expect(screen.getByText('No movie selected')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Movie')).not.toBeInTheDocument();
    expect(screen.queryByText('7.5')).not.toBeInTheDocument();
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
    expect(screen.queryByText('2022-01-01')).not.toBeInTheDocument();
    expect(screen.queryByText('2h 0min')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock movie overview')).not.toBeInTheDocument();
  });
});
