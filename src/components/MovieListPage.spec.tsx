import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MovieListPage from './MovieListPage';
import useFilteredMovieList from '../hooks/UseFilteredMovieList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));
jest.mock('../hooks/UseFilteredMovieList', () => jest.fn());

describe('MovieListPage', () => {
  beforeEach(() => {
    // @ts-ignore
    useFilteredMovieList.mockReturnValue([
      { id: 1, title: 'Movie 1', genres: [] },
      { id: 2, title: 'Movie 2', genres: [] },
      { id: 3, title: 'Movie 3', genres: [] },
    ]);
  });

  it('should render the movie list page correctly', () => {
    render(<MovieListPage />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
  });

  it('should log a message when onMovieDelete is called', () => {
    console.log = jest.fn();

    render(<MovieListPage />);

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const confirmDeleteButton = screen.getByText('CONFIRM');
    fireEvent.click(confirmDeleteButton);

    expect(console.log).toHaveBeenCalledWith('Movie 1 is removed');
  });
});
