import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
jest.mock("./hooks/UseFilteredMovieList", () => {
  return () => []
});

describe('App', () => {
  it('renders', () => {
    render(<App />);

    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });
});
