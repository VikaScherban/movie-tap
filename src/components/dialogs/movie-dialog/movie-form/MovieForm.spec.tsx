import { render, fireEvent, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import MovieForm from './MovieForm';
import { Movie } from '../../../../models/movies';
import { GenreTitle } from '../../../../constants/genres-const';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn().mockReturnValue({
    register: jest.fn(),
    control: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  }),
  Controller: jest.fn(),
}));

describe('MovieForm', () => {
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
  });

  it('should render the movie form component with all form elements', () => {
    (useForm as jest.Mock).mockReturnValueOnce({
      register: jest.fn(),
      control: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
    });

    render(
      <MovieForm
        onClose={jest.fn()}
        onSubmitChanges={jest.fn()}
        movie={movieMock}
      />,
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

  it.only('should call onClose when the reset button is clicked', () => {
    const onCloseSpy = jest.fn();

    (useForm as jest.Mock).mockReturnValueOnce({
      register: jest.fn(),
      control: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
    });

    render(
      <MovieForm
        onClose={onCloseSpy}
        onSubmitChanges={jest.fn()}
        movie={movieMock}
      />,
    );

    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmitChanges when the form is submitted', () => {
    const onSubmitChangesSpy = jest.fn();
    const newMovie = {
      title: 'Test Movie',
      runtime: 123,
      vote_average: 6.8,
      poster_path: 'http://img1',
      release_date: '01.02.2002',
      genres: [GenreTitle.Horror, GenreTitle.Documentary],
      overview: 'Description of Test Movie',
    };
    const handleSubmit = jest.fn((callback) => callback(newMovie));

    (useForm as jest.Mock).mockReturnValueOnce({
      register: jest.fn(),
      control: jest.fn(),
      handleSubmit,
      formState: { errors: {} },
    });

    render(
      <MovieForm
        onClose={jest.fn()}
        onSubmitChanges={onSubmitChangesSpy}
        movie={movieMock}
      />,
    );

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(onSubmitChangesSpy).toHaveBeenCalledWith(newMovie);
  });
});
