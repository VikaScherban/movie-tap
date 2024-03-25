import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
    let onSearchChangedSpy: jest.Mock<any>;
    let addMovieSpy: jest.Mock<any>;

    beforeEach(() => {
        onSearchChangedSpy = jest.fn();
        addMovieSpy = jest.fn();
    });

    it('renders without crashing', () => {
        render(<Header query={''} addMovie = {addMovieSpy} onSearchChanged={onSearchChangedSpy} />);

        expect(screen.getByText("+ ADD MOVIE")).toBeInTheDocument();
    });

    it('calls alert when Add Movie button is clicked', () => {
        render(<Header query={''} addMovie = {addMovieSpy} onSearchChanged={onSearchChangedSpy} />);

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(addMovieSpy).toHaveBeenCalledTimes(1);
    });

    it('shows input field', () => {
        render(<Header query={''} addMovie = {addMovieSpy} onSearchChanged={onSearchChangedSpy} />);

        expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    });

    it('calls onSearchChanged on input change', () => {
        render(<Header query={''} addMovie = {addMovieSpy} onSearchChanged={onSearchChangedSpy} />);

        fireEvent.change(screen.getByPlaceholderText('What do you want to watch?'), { target: { value: 'test' } });
        fireEvent.click(screen.getByText('SEARCH'));

        expect(onSearchChangedSpy).toHaveBeenCalledWith('test');
    });

});
