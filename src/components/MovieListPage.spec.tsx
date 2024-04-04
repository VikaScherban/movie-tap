import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import MovieListPage from "./MovieListPage";
import useFilteredMovieList from "../hooks/UseFilteredMovieList";
import {GenreTitle} from "../constants/genres-const";
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));
jest.mock("../hooks/UseFilteredMovieList", () => jest.fn());


describe('MovieListPage', () => {
  beforeEach(() => {
    // @ts-ignore
    useFilteredMovieList.mockReturnValue([
      { id: 1, title: 'Movie 1', genres: [] },
      { id: 2, title: 'Movie 2', genres: [] },
      { id: 3, title: 'Movie 3', genres: [] }
    ]);
  });

  it('should render the movie list page correctly', () => {
    render(<MovieListPage />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
  });

  it('should open the movie dialog for editing', () => {
    render(<MovieListPage />);

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit movie')).toBeInTheDocument();
  });

  it('should close the movie dialog', () => {
    render(<MovieListPage />);

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const closeButton = screen.getByTestId('dialog-close-button');

    expect(screen.getByTestId('dialog')).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('should log a message when onMovieDelete is called', () => {
    console.log = jest.fn();

    render(<MovieListPage />);

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const confirmDeleteButton = screen.getByText('CONFIRM')
    fireEvent.click(confirmDeleteButton);

    expect(console.log).toHaveBeenCalledWith('Movie 1 is removed');
  });

  it('should log a message and receives the updated movie when onSubmitChanges is called', () => {
    console.log = jest.fn();

    render(<MovieListPage />);

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const mockMovie = {
      id: 1,
      poster_path: '',
      title: 'Movie 1',
      release_date: '',
      genres: [],
      vote_average: 0,
      runtime: 0,
      overview: '',
    };
    fireEvent.submit(screen.getByTestId('movie-form'), {
      target: { movie: {} },
    });

    expect(console.log).toHaveBeenCalledWith('Movie is updated', mockMovie);
  });
});
