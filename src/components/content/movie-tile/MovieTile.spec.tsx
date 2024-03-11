import {fireEvent, render, screen} from '@testing-library/react';
import MovieTile from './MovieTile';
import {Movie} from "../../../models/movies";
import {GenreTitle} from "../../../constants/genres-const";
import Mock = jest.Mock;

describe('MovieTile', () => {
    let dummyMovieInfo: Movie;
    let onMovieSelectedSpy: Mock<any>;

    beforeEach(() => {
        dummyMovieInfo = {
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
    })

    it('should render the movie tile component', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const movieTile = screen.getByTestId('movie-tile');

        expect(movieTile).toBeInTheDocument();
    });

    it('should render the movie name', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const movieName = screen.getByText('Example Movie');

        expect(movieName).toBeInTheDocument();
    });

    it('should render the movie genres', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const movieGenres = screen.getByText('Comedy, Documentary');

        expect(movieGenres).toBeInTheDocument();
    });

    it('should render the movie date', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const movieDate = screen.getByText('2022-01-01');

        expect(movieDate).toBeInTheDocument();
    });

    it('should call the onMovieSelected prop when the movie poster is clicked', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const moviePoster = screen.getByText('Example Movie');
        fireEvent.click(moviePoster);

        expect(onMovieSelectedSpy).toHaveBeenCalledWith(1);
    });

    it('should call the onMovieSelected prop when the movie name is clicked', () => {
        render(<MovieTile movieInfo={dummyMovieInfo} onMovieSelected={onMovieSelectedSpy} />);

        const movieName = screen.getByText('Example Movie');
        fireEvent.click(movieName);

        expect(onMovieSelectedSpy).toHaveBeenCalledWith(1);
    });
});
