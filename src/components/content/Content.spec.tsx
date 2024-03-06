import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';

import Content from './Content';
import {GenresList, GenreTitle} from "../../constants/genres-const";
import {MoviesList} from "../../constants/movies-const";
import userEvent from "@testing-library/user-event";
import {SortByOption} from "../../constants/sort-control-const";

describe('Content', () => {
  let dummyMovieSelected: jest.Mock<any>;

  beforeEach(() => {
    dummyMovieSelected = jest.fn();
  });

  it('renders the movie list', () => {
    render(<Content movieSelected={dummyMovieSelected} />);

    const movieList = screen.getByTestId('movie-list');

    expect(movieList).toBeInTheDocument();
  });

  test('renders the filter line', () => {
    render(<Content movieSelected={dummyMovieSelected} />);

    const filterLine = screen.getByTestId('filter-line');

    expect(filterLine).toBeInTheDocument();
  });

  test('renders the count of movies found', () => {
    render(<Content movieSelected={dummyMovieSelected} />);

    const countResult = screen.getByText('movies found');

    expect(countResult).toBeInTheDocument();
  });

  test('renders the movie tiles based on the movies list', () => {
    render(<Content movieSelected={dummyMovieSelected} />);

    const movieTitle = screen.getByText('Movie 1');

    expect(movieTitle).toBeInTheDocument();
  });

  test('calls the movieSelected prop when a movie tile is clicked', () => {
    render(<Content movieSelected={dummyMovieSelected} />);

    const movieTitle = screen.getByText('Movie 3');

    fireEvent.click(movieTitle);
    expect(dummyMovieSelected).toHaveBeenCalledWith(2);
  });
});
