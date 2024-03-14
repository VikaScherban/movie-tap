import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
    let consoleLogSpy: jest.SpyInstance;
    let addMovieSpy: jest.Mock<any>;

    beforeEach(() => {
        addMovieSpy = jest.fn();
        consoleLogSpy = jest.spyOn(console, 'log');
    });

    it('renders without crashing', () => {
        render(<Header addMovie = {addMovieSpy} />);

        expect(screen.getByText("+ ADD MOVIE")).toBeInTheDocument();
    });

    it('calls alert when Add Movie button is clicked', () => {
        render(<Header addMovie = {addMovieSpy} />);

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(addMovieSpy).toHaveBeenCalledTimes(1);
    });

    it('shows input field', () => {
        render(<Header addMovie = {addMovieSpy} />);

        expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    });

    it('calls searchChange on input change', () => {
        render(<Header addMovie = {addMovieSpy} />);

        fireEvent.change(screen.getByPlaceholderText('What do you want to watch?'), { target: { value: 'test' } });
        fireEvent.click(screen.getByText('SEARCH'));

        expect(consoleLogSpy).toHaveBeenCalledWith('searchChange', 'test');
    });

});
