import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
    let consoleLogSpy: jest.SpyInstance;
    let alertMock: jest.Mock<any>;

    beforeEach(() => {
        alertMock = jest.fn()
        window.alert = alertMock;
        consoleLogSpy = jest.spyOn(console, 'log');
    });

    it('renders without crashing', () => {
        render(<Header />);

        expect(screen.getByText("+ ADD MOVIE")).toBeInTheDocument();
    });

    it('calls alert when Add Movie button is clicked', () => {
        render(<Header />);

        fireEvent.click(screen.getByText("+ ADD MOVIE"));

        expect(alertMock).toHaveBeenCalledWith('Add Movie Soon');
    });

    it('shows input field', () => {
        render(<Header />);

        expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    });

    it('calls searchChange on input change', () => {
        render(<Header />);

        fireEvent.change(screen.getByPlaceholderText('What do you want to watch?'), { target: { value: 'test' } });
        fireEvent.click(screen.getByText('SEARCH'));

        expect(consoleLogSpy).toHaveBeenCalledWith('searchChange', 'test');
    });

});
