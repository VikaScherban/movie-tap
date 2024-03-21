import {render, fireEvent, screen} from '@testing-library/react';
import MovieDialog from './MovieDialog';
import {GenreTitle} from "../../../constants/genres-const";
import {Movie} from "../../../models/movies";

describe('MovieDialog', () => {
  let movieMock: Movie;

  beforeEach(() => {
    movieMock = {
      id: 0,
      poster_path: 'http://img1',
      title: 'Movie 1',
      release_date: '01.01.01',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      vote_average: 7.4,
      runtime: 184,
      overview: 'Description of Movie 1',
    };
  })

  it('should render the movie dialog component with title and movie form', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();
    const title = 'Edit Movie';

    render(
        <MovieDialog
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            title={title}
            movie={movieMock}
        />
    );

    const dialog = screen.getByTestId('dialog');
    const dialogTitle = screen.getByText(title);
    const movieForm = screen.getByTestId('movie-form');

    expect(dialog).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
    expect(movieForm).toBeInTheDocument();
  });

  it('should call onClose when the dialog close button is clicked', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();
    const title = 'Edit Movie';

    render(
        <MovieDialog
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            title={title}
            movie={movieMock}
        />
    );

    const dialogCloseButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(dialogCloseButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmitChanges when the movie form is submitted', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();
    const title = 'Edit Movie';

    render(
        <MovieDialog
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            title={title}
            movie={movieMock}
        />
    );

    const movieForm = screen.getByTestId('movie-form');
    fireEvent.submit(movieForm);

    expect(onSubmitChangesMock).toHaveBeenCalledTimes(1);
  });
});
