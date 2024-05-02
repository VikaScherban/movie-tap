import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/UseFilteredMovieList', () => () => []);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));

describe('App', () => {
  it('renders', () => {
    render(<App />);

    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });
});
