import {render, fireEvent, screen} from '@testing-library/react';
import MovieForm from './MovieForm';
import {Movie} from "../../../../models/movies";
import {GenreTitle} from "../../../../constants/genres-const";

describe('MovieForm', () => {
  let movieMock: Movie;

  beforeEach(() => {
    movieMock = {
      id: 0,
      imgUrl: 'http://img1',
      name: 'Movie 1',
      date: '01.01.01',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      rating: 7.4,
      duration: 184,
      description: 'Description of Movie 1',
    };
  })

  test('should render the movie form component with all form elements', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();

    render(
        <MovieForm
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            movie={movieMock}
        />
    );

    const form = screen.getByTestId('movie-form');
    const nameInput = screen.getByLabelText('Title');
    const urlInput = screen.getByLabelText('Movie url');
    const dateInput = screen.getByLabelText('Release Date');
    const ratingInput = screen.getByLabelText('Rating');
    const durationInput = screen.getByLabelText('Runtime');
    const descriptionTextarea = screen.getByLabelText('Overview');
    const resetButton = screen.getByText('RESET');
    const submitButton = screen.getByText('SUBMIT');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(ratingInput).toBeInTheDocument();
    expect(durationInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should call onClose when the reset button is clicked', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();

    render(
        <MovieForm
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            movie={movieMock}
        />
    );

    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmitChanges when the form is submitted', () => {
    const onCloseMock = jest.fn();
    const onSubmitChangesMock = jest.fn();

    render(
        <MovieForm
            onClose={onCloseMock}
            onSubmitChanges={onSubmitChangesMock}
            movie={movieMock}
        />
    );

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(onSubmitChangesMock).toHaveBeenCalledTimes(1);
  });
});
