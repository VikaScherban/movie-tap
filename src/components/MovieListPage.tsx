import React from 'react';
import { Movie } from '../models/movies';
import Header from './header/Header';
import Content from './content/Content';
import useFilteredMovieList from '../hooks/UseFilteredMovieList';

function MovieListPage(): React.JSX.Element {
  const movieList: Movie[] = useFilteredMovieList();

  const onMovieDelete = (id: number) => {
    console.log(`Movie ${id} is removed`);
  };

  return (
    <>
      <Header />
      <Content movieList={movieList} onMovieDelete={onMovieDelete} />
    </>
  );
}

export default MovieListPage;
