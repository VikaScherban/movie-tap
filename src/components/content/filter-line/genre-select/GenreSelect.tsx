import './GenreSelect.css';
import React from 'react';
import { GenreData } from '../../../../models/genres';

function GenreSelect({ genres, currentGenre, onGenreSelected }: GenreData): React.JSX.Element {
  return (
    <div>
      <ul className="genres-list">
        {genres.map((genre) => (
          <li
            key={genre}
            className={currentGenre === genre ? 'genre-tab active' : 'genre-tab'}
            onClick={() => onGenreSelected(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreSelect;
