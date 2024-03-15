import {fireEvent, render, screen} from '@testing-library/react';
import MovieTile from './MovieTile';
import {Movie} from "../../../models/movies";
import {GenreTitle} from "../../../constants/genres-const";
import Mock = jest.Mock;

describe('MovieTile', () => {
    let movieInfoMock: Movie;
    let onMovieSelectedSpy: Mock<any>;
    let onMovieEditSpy: jest.Mock<any>;
    let onMovieDeleteSpy: jest.Mock<any>;

    beforeEach(() => {
        movieInfoMock = {
            id: 1,
            name: 'Example Movie',
            genres: [GenreTitle.Comedy, GenreTitle.Documentary],
            date: '2022-01-01',
            imgUrl: 'https://example.com/movie-poster.png',
            description: 'Some text',
            duration: 345,
            rating: 7.5,
        };
        onMovieSelectedSpy = jest.fn();
        onMovieEditSpy = jest.fn();
        onMovieDeleteSpy = jest.fn();
    })

    it('should render the movie tile component', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const movieTile = screen.getByTestId('movie-card-1');

        expect(movieTile).toBeInTheDocument();
    });

    it('should render the movie name', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const movieName = screen.getByText('Example Movie');

        expect(movieName).toBeInTheDocument();
    });

    it('should render the movie genres', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const movieGenres = screen.getByText('Comedy, Documentary');

        expect(movieGenres).toBeInTheDocument();
    });

    it('should render the movie date', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const movieDate = screen.getByText('2022-01-01');

        expect(movieDate).toBeInTheDocument();
    });

    it('should call the onMovieSelected prop when the movie poster is clicked', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const moviePoster = screen.getByText('Example Movie');
        fireEvent.click(moviePoster);

        expect(onMovieSelectedSpy).toHaveBeenCalledWith(1);
    });

    it('should call the onMovieSelected prop when the movie name is clicked', () => {
        render(<MovieTile movieInfo={movieInfoMock}
                          onMovieSelected={onMovieSelectedSpy}
                          onMovieDelete={onMovieDeleteSpy}
                          onMovieEdit={onMovieEditSpy}
        />);

        const movieName = screen.getByText('Example Movie');
        fireEvent.click(movieName);

        expect(onMovieSelectedSpy).toHaveBeenCalledWith(1);
    });

    it('should call onMovieEdit when the "Edit" option is clicked', () => {
        render(
            <MovieTile
                movieInfo={movieInfoMock}
                onMovieSelected={onMovieSelectedSpy}
                onMovieEdit={onMovieEditSpy}
                onMovieDelete={onMovieDeleteSpy}
            />
        );

        const threeDotButtons = screen.getAllByTestId('three-dot-button');
        fireEvent.click(threeDotButtons[0]);
        const editOption = screen.getByText('Edit');
        fireEvent.click(editOption);

        expect(onMovieEditSpy).toHaveBeenCalledTimes(1);
        expect(onMovieEditSpy).toHaveBeenCalledWith(movieInfoMock.id);
    });

    it('should call onMovieDelete when the "Delete" option is clicked', () => {
        render(
            <MovieTile
                movieInfo={movieInfoMock}
                onMovieSelected={onMovieSelectedSpy}
                onMovieEdit={onMovieEditSpy}
                onMovieDelete={onMovieDeleteSpy}
            />
        );

        const threeDotButtons = screen.getAllByTestId('three-dot-button');
        fireEvent.click(threeDotButtons[0]);
        const deleteOption = screen.getByText('Delete');
        fireEvent.click(deleteOption);
        const confirmDeleteButton = screen.getByText('CONFIRM')
        fireEvent.click(confirmDeleteButton);

        expect(onMovieDeleteSpy).toHaveBeenCalledTimes(1);
        expect(onMovieDeleteSpy).toHaveBeenCalledWith(movieInfoMock.id);
    });

    it('should close three dots menu', () => {
        render(
            <MovieTile
                movieInfo={movieInfoMock}
                onMovieSelected={onMovieSelectedSpy}
                onMovieEdit={onMovieEditSpy}
                onMovieDelete={onMovieDeleteSpy}
            />
        );

        const threeDotButton = screen.getByTestId('three-dot-button');
        fireEvent.click(threeDotButton);
        const closeOption = screen.getByTestId('movie-close-button');
        fireEvent.click(closeOption);

        expect(onMovieEditSpy).not.toHaveBeenCalled();
        expect(onMovieDeleteSpy).not.toHaveBeenCalled();
        expect(closeOption).not.toBeInTheDocument();
    });

    it('should close confirm deletion dialog', () => {
        render(
            <MovieTile
                movieInfo={movieInfoMock}
                onMovieSelected={onMovieSelectedSpy}
                onMovieEdit={onMovieEditSpy}
                onMovieDelete={onMovieDeleteSpy}
            />
        );

        const threeDotButtons = screen.getAllByTestId('three-dot-button');
        fireEvent.click(threeDotButtons[0]);
        const deleteOption = screen.getByText('Delete');
        fireEvent.click(deleteOption);
        const closeDeleteButton = screen.getByTestId('dialog-close-button')
        fireEvent.click(closeDeleteButton);

        expect(onMovieEditSpy).not.toHaveBeenCalled();
        expect(onMovieDeleteSpy).not.toHaveBeenCalled();
        expect(deleteOption).not.toBeInTheDocument();
        expect(closeDeleteButton).not.toBeInTheDocument();
    });
});
