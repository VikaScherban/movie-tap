import {render, fireEvent, screen} from '@testing-library/react';
import MovieDialog from './MovieDialog';
import useMovieById from "../../../hooks/UseMovieById";
import useSaveMovie from "../../../hooks/UseSaveMovie";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import {useForm} from "react-hook-form";
import {Movie} from "../../../models/movies";
jest.mock('../../../hooks/UseMovieById', () => jest.fn());
jest.mock('../../../hooks/UseSaveMovie', () => jest.fn());
jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());
jest.mock('react-hook-form', () => ({
  useForm: jest.fn().mockReturnValue({
    register: jest.fn(),
    control: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  }),
  Controller: jest.fn(),
}));

describe('MovieDialog', () => {
  let mockMovie: Movie;
  let navigateToSpy: jest.SpyInstance;

  beforeEach(() => {
    mockMovie = {
      id: 123,
      title: 'Test Movie',
      poster_path: 'https://example.com/poster',
      genres: ['Action', 'Adventure'],
      release_date: '2022-01-01',
      vote_average: 8.5,
      runtime: 120,
      overview: 'This is a test movie',
    };
    // @ts-ignore
    useSaveMovie.mockReturnValue({
      createMovie: jest.fn(),
      updateMovie: jest.fn(),
    });

    navigateToSpy = jest.fn();
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      navigateTo: navigateToSpy,
    });

    const handleSubmitSpy = jest.fn((callback) => callback(mockMovie));
    // @ts-ignore
    useForm.mockReturnValueOnce({
      register: jest.fn(),
      control: jest.fn(),
      handleSubmit: handleSubmitSpy,
      formState: { errors: {} },
    });
  });

  it('should render the movie dialog component with Edit title and movie form', () => {
    render(<MovieDialog isEdit={true}/>);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Movie')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
  });

  it('should render the movie dialog component with New movie title and movie form', () => {
    render(<MovieDialog isEdit={false}/>);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Movie')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
  });

  it('should call onClose when the dialog close button is clicked', () => {
    render(<MovieDialog isEdit={false}/>);

    const dialogCloseButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(dialogCloseButton);

    expect(navigateToSpy).toHaveBeenCalledWith( '/');
  });

  it('should call createMovie when the movie form is submitted', () => {
    const createMovieSpy = jest.fn().mockResolvedValue({});
    const handleSubmitSpy = jest.fn((callback) => callback(mockMovie));
    // @ts-ignore
    useSaveMovie.mockReturnValueOnce({
      createMovie: createMovieSpy,
      updateMovie: jest.fn().mockResolvedValue({}),
    });
    // @ts-ignore
    useForm.mockReturnValueOnce({
      register: jest.fn(),
      control: jest.fn(),
      handleSubmit: handleSubmitSpy,
      formState: { errors: {} },
    });

    render(<MovieDialog isEdit={false} />);

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(createMovieSpy).toHaveBeenCalledWith({...mockMovie});
  });

  it('should call updateMovie when a movie is edited', async () => {
    // @ts-ignore
    useMovieById.mockReturnValue({
      id: 1,
      title: 'Example Movie',
      genres: ['Horror', 'Documentary'],
      release_date: '2022-01-01',
      runtime: 120,
      vote_average: 8.5,
      poster_path: 'https://example.com/movie-poster.png',
      overview: 'Mock movie overview',
    });
    const updateMovie = jest.fn().mockResolvedValue({});
    // @ts-ignore
    useSaveMovie.mockReturnValueOnce({
      createMovie: jest.fn().mockResolvedValue({}),
      updateMovie: updateMovie,
    });

    render(<MovieDialog isEdit={true} />);

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(updateMovie).toHaveBeenCalledWith({ ...mockMovie, id: 1 });
  });
});
