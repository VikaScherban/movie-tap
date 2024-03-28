import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('renders the header component correctly', () => {
        render(<Header />);

        const headerElement = screen.getByTestId('header-component');
        expect(headerElement).toBeInTheDocument();
    });
});
