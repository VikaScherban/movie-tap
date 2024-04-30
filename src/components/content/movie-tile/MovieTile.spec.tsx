import { fireEvent, render, screen } from '@testing-library/react';
import MovieTile from './MovieTile';
import { Movie } from '../../../models/movies';
import { GenreTitle } from '../../../constants/genres-const';
import useMultipleSearchParams from '../../../hooks/UseMultipleSearchParams';

jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());

describe('MovieTile', () => {
  let movieInfoMock: Movie;
  let onMovieEditSpy: jest.Mock<any>;
  let onMovieDeleteSpy: jest.Mock<any>;
  let navigateToSpy: jest.Mock<any>;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    navigateToSpy = jest.fn();
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      navigateTo: navigateToSpy,
    });

    movieInfoMock = {
      id: 1,
      title: 'Example Movie',
      genres: [GenreTitle.Comedy, GenreTitle.Documentary],
      release_date: '2022-01-01',
      poster_path: 'https://example.com/movie-poster.png',
      overview: 'Some text',
      runtime: 345,
      vote_average: 7.5,
    };
    onMovieEditSpy = jest.fn();
    onMovieDeleteSpy = jest.fn();
  });

  it('should render the movie tile component', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const movieTile = screen.getByTestId('movie-card-1');

    expect(movieTile).toBeInTheDocument();
  });

  it('should render the movie name', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const movieName = screen.getByText('Example Movie');

    expect(movieName).toBeInTheDocument();
  });

  it('should render the movie genres', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const movieGenres = screen.getByText('Comedy, Documentary');

    expect(movieGenres).toBeInTheDocument();
  });

  it('should render the movie date', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const movieDate = screen.getByText('2022-01-01');

    expect(movieDate).toBeInTheDocument();
  });

  it('should call the onMovieSelected prop when the movie poster is clicked', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const moviePoster = screen.getByText('Example Movie');
    fireEvent.click(moviePoster);

    expect(navigateToSpy).toHaveBeenCalledWith('/1');
  });

  it('should call the onMovieSelected prop when the movie name is clicked', () => {
    render(<MovieTile
      movieInfo={movieInfoMock}
      onMovieDelete={onMovieDeleteSpy}
    />);

    const movieName = screen.getByText('Example Movie');
    fireEvent.click(movieName);

    expect(navigateToSpy).toHaveBeenCalledWith('/1');
  });

  it('should call onMovieEdit when the "Edit" option is clicked', () => {
    render(
      <MovieTile
        movieInfo={movieInfoMock}
        onMovieDelete={onMovieDeleteSpy}
      />,
    );

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editOption = screen.getByText('Edit');
    fireEvent.click(editOption);

    expect(navigateToSpy).toHaveBeenCalledWith('/1/edit');
  });

  it('should call onMovieDelete when the "Delete" option is clicked', () => {
    render(
      <MovieTile
        movieInfo={movieInfoMock}
        onMovieDelete={onMovieDeleteSpy}
      />,
    );

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);
    const confirmDeleteButton = screen.getByText('CONFIRM');
    fireEvent.click(confirmDeleteButton);

    expect(onMovieDeleteSpy).toHaveBeenCalledTimes(1);
    expect(onMovieDeleteSpy).toHaveBeenCalledWith(movieInfoMock.id);
  });

  it('should close three dots menu', () => {
    render(
      <MovieTile
        movieInfo={movieInfoMock}
        onMovieDelete={onMovieDeleteSpy}
      />,
    );

    const threeDotButton = screen.getByTestId('three-dot-button');
    fireEvent.click(threeDotButton);
    const closeOption = screen.getByTestId('movie-close-button');
    fireEvent.click(closeOption);

    expect(onMovieEditSpy).not.toHaveBeenCalled();
    expect(onMovieDeleteSpy).not.toHaveBeenCalled();
    expect(closeOption).not.toBeInTheDocument();
  });

  it('should close confirm deletion dialog', () => {
    render(
      <MovieTile
        movieInfo={movieInfoMock}
        onMovieDelete={onMovieDeleteSpy}
      />,
    );

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);
    const closeDeleteButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(closeDeleteButton);

    expect(onMovieEditSpy).not.toHaveBeenCalled();
    expect(onMovieDeleteSpy).not.toHaveBeenCalled();
    expect(deleteOption).not.toBeInTheDocument();
    expect(closeDeleteButton).not.toBeInTheDocument();
  });
});
