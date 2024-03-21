import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import Content from './Content';
import {Movie} from "../../models/movies";
import {GenreTitle} from "../../constants/genres-const";
import {SortByOptions} from "../../constants/sort-control-const";

describe('Content', () => {
  let onMovieSelectedSpy: jest.Mock<any>;
  let onMovieEditSpy: jest.Mock<any>;
  let onMovieDeleteSpy: jest.Mock<any>;
  let onGenreSelectedSpy: jest.Mock<any>;
  let onSortChangedSpy: jest.Mock<any>;
  let moviesListMock: Movie[];

  beforeEach(() => {
    onMovieSelectedSpy = jest.fn();
    onMovieEditSpy = jest.fn();
    onMovieDeleteSpy = jest.fn();
    moviesListMock = [
      {
        id: 0,
        poster_path: 'http://img1',
        title: 'Movie 1',
        release_date: '01.01.01',
        genres: [GenreTitle.Horror, GenreTitle.Documentary],
        vote_average: 7.4,
        runtime: 184,
        overview: 'Description of Movie 1',
      },
      {
        id: 1,
        poster_path: 'http://img2',
        title: 'Movie 2',
        release_date: '04.02.99',
        genres: [GenreTitle.Crime, GenreTitle.Documentary],
        vote_average: 8.1,
        runtime: 192,
        overview: 'Description of Movie 2'
      },
      {
        id: 2,
        poster_path: 'http://img3',
        title: 'Movie 3',
        release_date: '14.10.11',
        genres: [GenreTitle.Documentary],
        vote_average: 9.4,
        runtime: 154,
        overview: 'Description of Movie 3'
      },
    ];
  });

  it('should render the movie list', () => {
    render(<Content data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
                    onGenreSelected={onGenreSelectedSpy}
                    onSortChanged={onSortChangedSpy}
    />);

    const movieList = screen.getByTestId('movie-list');

    expect(movieList).toBeInTheDocument();
  });

  it('should render the filter line', () => {
    render(<Content data={{movieList: [], sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
                    onGenreSelected={onGenreSelectedSpy}
                    onSortChanged={onSortChangedSpy}
    />);

    const filterLine = screen.getByTestId('filter-line');

    expect(filterLine).toBeInTheDocument();
  });

  it('should render the count of movies found', () => {
    render(<Content data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
                    onGenreSelected={onGenreSelectedSpy}
                    onSortChanged={onSortChangedSpy}
    />);

    const countResult = screen.getByText('movies found');

    expect(countResult).toBeInTheDocument();
  });

  it('should render the movie tiles based on the movies list', () => {
    render(<Content data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
                    onGenreSelected={onGenreSelectedSpy}
                    onSortChanged={onSortChangedSpy}
    />);

    const movieTitle = screen.getByText('Movie 1');

    expect(movieTitle).toBeInTheDocument();
  });

  it('should call the movieSelected prop when a movie tile is clicked', () => {
    render(<Content data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
                    onMovieSelected={onMovieSelectedSpy}
                    onMovieEdit={onMovieEditSpy}
                    onMovieDelete={onMovieDeleteSpy}
                    onGenreSelected={onGenreSelectedSpy}
                    onSortChanged={onSortChangedSpy}
    />);

    const movieTitle = screen.getByText('Movie 3');

    fireEvent.click(movieTitle);
    expect(onMovieSelectedSpy).toHaveBeenCalledWith(2);
  });

  it('calls onMovieEdit when the edit button in a movie tile is clicked', () => {
    render(
        <Content
            data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
            onMovieSelected={onMovieSelectedSpy}
            onMovieEdit={onMovieEditSpy}
            onMovieDelete={onMovieDeleteSpy}
            onGenreSelected={onGenreSelectedSpy}
            onSortChanged={onSortChangedSpy}
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
            data={{movieList: moviesListMock, sortBy: SortByOptions.releaseDate.value, activeGenre: 'All'}}
            onMovieSelected={onMovieSelectedSpy}
            onMovieEdit={onMovieEditSpy}
            onMovieDelete={onMovieDeleteSpy}
            onGenreSelected={onGenreSelectedSpy}
            onSortChanged={onSortChangedSpy}
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
