import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import HeaderWithSearch from "./HeaderWithSearch";
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: () => jest.fn(),
}));

describe('HeaderWithSearch', () => {
    it('should render without crashing', () => {
        render(<HeaderWithSearch/>);

        expect(screen.getByText("+ ADD MOVIE")).toBeInTheDocument();
    });

    it('should open dialog when Add Movie button is clicked', () => {
        render(<HeaderWithSearch/>);

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(screen.getByTestId('movie-form')).toBeInTheDocument();
        expect(screen.getByText('Add movie')).toBeInTheDocument();
    });

    it('should show input field', () => {
        render(<HeaderWithSearch/>);

        expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    });

    it('should close dialog', () => {
        render(<HeaderWithSearch/>);

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(screen.getByTestId('movie-form')).toBeInTheDocument();
        expect(screen.getByText('Add movie')).toBeInTheDocument();

        const dialogCloseButton = screen.getByTestId('dialog-close-button');
        fireEvent.click(dialogCloseButton);

        expect(screen.queryByTestId('movie-form')).not.toBeInTheDocument();
    });

    it('should submit dialog data', () => {
        const movie = {genres: [], id: expect.any(Number), overview: '', poster_path: '', release_date: '', runtime: 0, title: '', vote_average: 0};

        render(<HeaderWithSearch/>);

        console.log = jest.fn();

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(screen.getByTestId('movie-form')).toBeInTheDocument();
        expect(screen.getByText('Add movie')).toBeInTheDocument();

        fireEvent.click(screen.getByText('SUBMIT'));

        expect(screen.queryByTestId('movie-form')).not.toBeInTheDocument();
        expect(console.log).toHaveBeenCalledWith('New movie is added', movie);
    });
});
