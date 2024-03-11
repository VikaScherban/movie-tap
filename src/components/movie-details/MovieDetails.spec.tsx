import {fireEvent, render, screen} from '@testing-library/react';
import MovieDetails from './MovieDetails';
import {Movie} from "../../models/movies";
import {GenreTitle} from "../../constants/genres-const";

describe('MovieDetails', () => {
  let dummyMovie: Movie;
  let dummyGoBackClick: jest.Mock<any>;

  beforeEach(() => {
    dummyMovie = {
      id: 1,
      name: 'Example Movie',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      date: '2022-01-01',
      duration: 120,
      rating: 8.5,
      imgUrl: 'https://example.com/movie-poster.png',
      description: 'This is an example movie.',
    };
    dummyGoBackClick = jest.fn();
  });

  test('should renders the movie details component with no movie selected', () => {
    render(<MovieDetails movie={null} goBackClick={dummyGoBackClick} />);

    const noMovieSelectedText = screen.getByText('No movie selected');

    expect(noMovieSelectedText).toBeInTheDocument();
  });

  test('should renders the movie details component with a movie', () => {
    render(<MovieDetails movie={dummyMovie} goBackClick={dummyGoBackClick} />);

    const movieName = screen.getByText('Example Movie');
    const movieGenres = screen.getByText('Horror, Documentary');

    expect(movieName).toBeInTheDocument();
    expect(movieGenres).toBeInTheDocument();
  });

  test('should calls the goBackClick prop when the add button is clicked', () => {
    render(<MovieDetails movie={dummyMovie} goBackClick={dummyGoBackClick} />);

    const addButton = screen.getByTestId('search-icon');
    fireEvent.click(addButton);

    expect(dummyGoBackClick).toHaveBeenCalled();
  });
});
