import {render, fireEvent, screen} from '@testing-library/react';
import MovieDialog from './MovieDialog';
import useMovieById from "../../../hooks/UseMovieById";
import useSaveMovie from "../../../hooks/UseSaveMovie";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import {useForm} from "react-hook-form";
import {Movie} from "../../../models/movies";
import {MovieStatus} from "../../../constants/url-queries-const";
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
    (useMovieById as jest.Mock).mockReturnValue({movie: mockMovie, status: MovieStatus.Ready});

    render(<MovieDialog/>);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Movie')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
  });

  it('should render the movie dialog component with New movie title and movie form', () => {
    (useMovieById as jest.Mock).mockReturnValue({movie: null, status: MovieStatus.Ready});

    render(<MovieDialog/>);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Movie')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
  });

  it('should render the loading state when data is not ready', () => {
    (useMovieById as jest.Mock).mockReturnValue({movie: null, status: MovieStatus.Loading});

    render(<MovieDialog/>);

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Add New Movie')).not.toBeInTheDocument();
    expect(screen.queryByTestId('movie-form')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should call onClose when the dialog close button is clicked', () => {
    (useMovieById as jest.Mock).mockReturnValue({movie: null, status: MovieStatus.Ready});

    render(<MovieDialog/>);

    const dialogCloseButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(dialogCloseButton);

    expect(navigateToSpy).toHaveBeenCalledWith( '/');
  });

  it('should call createMovie when the movie form is submitted', () => {
    const createMovieSpy = jest.fn().mockResolvedValue({});
    const handleSubmitSpy = jest.fn((callback) => callback({...mockMovie, id: undefined}));
    (useMovieById as jest.Mock).mockReturnValue({movie: null, status: MovieStatus.Ready});
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

    render(<MovieDialog/>);

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(createMovieSpy).toHaveBeenCalledWith({...mockMovie});
  });

  it('should call updateMovie when a movie is edited', async () => {
    (useMovieById as jest.Mock).mockReturnValue({movie: mockMovie, status: MovieStatus.Ready});
    const updateMovie = jest.fn().mockResolvedValue({});
    // @ts-ignore
    useSaveMovie.mockReturnValueOnce({
      createMovie: jest.fn().mockResolvedValue({}),
      updateMovie: updateMovie,
    });

    render(<MovieDialog/>);

    const form = screen.getByTestId('movie-form');
    fireEvent.submit(form);

    expect(updateMovie).toHaveBeenCalledWith({ ...mockMovie });
  });
});
