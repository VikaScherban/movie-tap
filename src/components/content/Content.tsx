import './Content.css';
import React from 'react';
import FilterLine from './filter-line/FilterLine';
import MovieTile from './movie-tile/MovieTile';
import { ContentData } from '../../models/content';

function Content({ movieList, onMovieDelete }: ContentData): React.JSX.Element {
  return (
    <div className="wrap-content" data-testid="movie-list">
      <FilterLine />
      <div className="count-result">
        <strong>{movieList?.length}</strong>
        {' '}
        movies found
      </div>
      <div className="movie-list">
        {movieList?.map((movieInfo) => (
          <MovieTile
            key={movieInfo.id}
            movieInfo={movieInfo}
            onMovieDelete={onMovieDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Content;
