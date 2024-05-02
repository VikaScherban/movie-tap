import './MovieForm.css';
import Select from 'react-select';
import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Movie, MovieFormData, NewMovie } from '../../../../models/movies';
import { GenreTitle } from '../../../../constants/genres-const';

interface IFormInput extends Movie {
    genreOptions: { label: string; value: string }[]
}

function MovieForm({ onClose, onSubmitChanges, movie }: MovieFormData): React.JSX.Element {
  const genreOptions = Object.values(GenreTitle).splice(1).map((genre) => ({ value: genre, label: genre }));
  const currentGenresOptions = movie?.genres.map((genre) => ({ value: genre, label: genre })) || [];

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: movie?.title || '',
      poster_path: movie?.poster_path || '',
      genres: movie?.genres || [],
      release_date: movie?.release_date || '',
      vote_average: movie?.vote_average || 0,
      runtime: movie?.runtime || 0,
      overview: movie?.overview || '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: NewMovie) => {
    onSubmitChanges({ ...data, runtime: +data.runtime, vote_average: +data.vote_average });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="movie-form">
      <div>
        <div className="form-left-side">
          <div className="movie-input">
            <label htmlFor="movie-name">Title</label>
            <input
              type="text"
              id="movie-name"
              data-testid="movie-name-input"
              {...register('title', { required: true })}
            />
            {errors.title && <span className="error-message">This is required</span>}
          </div>
          <div className="movie-input">
            <label htmlFor="movie-img-url">Movie url</label>
            <input
              type="text"
              id="movie-img-url"
              placeholder="https://"
              {...register('poster_path', { required: true })}
            />
            {errors.poster_path && <span className="error-message">This is required</span>}
          </div>
          <div className="movie-input">
            <label htmlFor="movie-genres">Genre</label>
            <Controller
              name="genres"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={(val) => onChange(val.map((c) => c.value))}
                  value={genreOptions.filter((c) => value.includes(c.value))}
                  name="genres"
                  className="genre-select"
                  id="movie-genres"
                  isMulti
                  defaultValue={currentGenresOptions}
                  options={genreOptions}
                />
              )}
            />
            {errors.genres && <span className="error-message">This is required</span>}
          </div>
        </div>
        <div className="form-right-side">
          <div className="movie-input">
            <label htmlFor="movie-date">Release Date</label>
            <input type="date" id="movie-date" {...register('release_date', { required: true })} />
            {errors.release_date && <span className="error-message">This is required</span>}
          </div>
          <div className="movie-input">
            <label htmlFor="movie-rating">Rating</label>
            <input type="number" step="0.1" id="movie-rating" {...register('vote_average', { required: true, min: 1 })} />
            {errors.vote_average && (
              <span className="error-message">
                This is required and
                {'>'}
                {' '}
                0
              </span>
            )}
          </div>
          <div className="movie-input">
            <label htmlFor="movie-duration">Runtime</label>
            <input
              type="number"
              placeholder="minutes"
              id="movie-duration"
              {...register('runtime', { required: true, min: 1 })}
            />
            {errors.runtime && (
              <span className="error-message">
                This is required and
                {'>'}
                {' '}
                0
              </span>
            )}
          </div>
        </div>
        <div className="movie-input">
          <label htmlFor="movie-description">Overview</label>
          <textarea
            placeholder="Movie description"
            id="movie-description"
            {...register('overview', { required: true })}
          />
          {errors.overview && <span className="error-message">This is required</span>}
        </div>
      </div>
      <div className="movie-dialog-footer">
        <button className="reset-button" onClick={onClose}>RESET</button>
        <button type="submit" className="submit-button">SUBMIT</button>
      </div>
    </form>
  );
}

export default MovieForm;
