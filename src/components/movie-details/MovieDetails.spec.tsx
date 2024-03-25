import {fireEvent, render, screen} from '@testing-library/react';
import MovieDetails from './MovieDetails';
import {Movie} from "../../models/movies";
import {GenreTitle} from "../../constants/genres-const";

describe('MovieDetails', () => {
  let movieMock: Movie;
  let goBackClickSpy: jest.Mock<any>;

  beforeEach(() => {
    movieMock = {
      id: 1,
      title: 'Example Movie',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      release_date: '2022-01-01',
      runtime: 120,
      vote_average: 8.5,
      poster_path: 'https://example.com/movie-poster.png',
      overview: 'This is an example movie.',
    };
    goBackClickSpy = jest.fn();
  });

  it('should render the movie details component with no movie selected', () => {
    render(<MovieDetails movie={null} goBackClick={goBackClickSpy} />);

    const noMovieSelectedText = screen.getByText('No movie selected');

    expect(noMovieSelectedText).toBeInTheDocument();
  });

  it('should render the movie details component with a movie', () => {
    render(<MovieDetails movie={movieMock} goBackClick={goBackClickSpy} />);

    const movieName = screen.getByText('Example Movie');
    const movieGenres = screen.getByText('Horror, Documentary');

    expect(movieName).toBeInTheDocument();
    expect(movieGenres).toBeInTheDocument();
  });

  it('should call the goBackClick prop when the add button is clicked', () => {
    render(<MovieDetails movie={movieMock} goBackClick={goBackClickSpy} />);

    const addButton = screen.getByTestId('search-icon');
    fireEvent.click(addButton);

    expect(goBackClickSpy).toHaveBeenCalled();
  });
});
