import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import Content from './Content';
import {Movie} from "../../models/movies";
import {GenreTitle} from "../../constants/genres-const";

describe('Content', () => {
  let onMovieSelectedSpy: jest.Mock<any>;
  let onMovieEditSpy: jest.Mock<any>;
  let onMovieDeleteSpy: jest.Mock<any>;
  let moviesListMock: Movie[];

  beforeEach(() => {
    onMovieSelectedSpy = jest.fn();
    onMovieEditSpy = jest.fn();
    onMovieDeleteSpy = jest.fn();
    moviesListMock = [
      {
        id: 0,
        imgUrl: 'http://img1',
        name: 'Movie 1',
        date: '01.01.01',
        genres: [GenreTitle.Horror, GenreTitle.Documentary],
        rating: 7.4,
        duration: 184,
        description: 'Description of Movie 1',
      },
      {
        id: 1,
        imgUrl: 'http://img2',
        name: 'Movie 2',
        date: '04.02.99',
        genres: [GenreTitle.Crime, GenreTitle.Documentary],
        rating: 8.1,
        duration: 192,
        description: 'Description of Movie 2'
      },
      {
        id: 2,
        imgUrl: 'http://img3',
        name: 'Movie 3',
        date: '14.10.11',
        genres: [GenreTitle.Documentary],
        rating: 9.4,
        duration: 154,
        description: 'Description of Movie 3'
      },
    ];
  });

  it('should render the movie list', () => {
    render(<Content moviesList={moviesListMock}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
    />);

    const movieList = screen.getByTestId('movie-list');

    expect(movieList).toBeInTheDocument();
  });

  it('should render the filter line', () => {
    render(<Content moviesList={[]}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
    />);

    const filterLine = screen.getByTestId('filter-line');

    expect(filterLine).toBeInTheDocument();
  });

  it('should render the count of movies found', () => {
    render(<Content moviesList={moviesListMock}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
    />);

    const countResult = screen.getByText('movies found');

    expect(countResult).toBeInTheDocument();
  });

  it('should render the movie tiles based on the movies list', () => {
    render(<Content moviesList={moviesListMock}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
    />);

    const movieTitle = screen.getByText('Movie 1');

    expect(movieTitle).toBeInTheDocument();
  });

  it('should call the movieSelected prop when a movie tile is clicked', () => {
    render(<Content moviesList={moviesListMock}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
    />);

    const movieTitle = screen.getByText('Movie 3');

    fireEvent.click(movieTitle);
    expect(onMovieSelectedSpy).toHaveBeenCalledWith(2);
  });

  it('calls onMovieEdit when the edit button in a movie tile is clicked', () => {
    render(
        <Content
            moviesList={moviesListMock}
            onMovieSelected={onMovieSelectedSpy}
            onMovieEdit={onMovieEditSpy}
            onMovieDelete={onMovieDeleteSpy}
        />
    );

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(onMovieEditSpy).toHaveBeenCalledTimes(1);
    expect(onMovieEditSpy).toHaveBeenCalledWith(0);
  });

  it('calls onMovieDelete when the delete button in a movie tile is clicked', () => {
    render(
        <Content
            moviesList={moviesListMock}
            onMovieSelected={onMovieSelectedSpy}
            onMovieEdit={onMovieEditSpy}
            onMovieDelete={onMovieDeleteSpy}
        />
    );

    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const confirmDeleteButton = screen.getByText('CONFIRM')
    fireEvent.click(confirmDeleteButton);

    expect(onMovieDeleteSpy).toHaveBeenCalledTimes(1);
    expect(onMovieDeleteSpy).toHaveBeenCalledWith(0);
  });
});
