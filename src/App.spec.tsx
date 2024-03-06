import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders', () => {
    render(<App />);

    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  it('should render the app component without a movie selected', () => {
    render(<App />);

    const appComponent = screen.getByTestId('app-component');
    const header = screen.getByTestId('header-component');
    const movieDetails = screen.queryByTestId('movie-details');
    const content = screen.getByTestId('movie-list');
    const counter = screen.getByTestId('counter-component');

    expect(appComponent).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(movieDetails).not.toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
  });

  it('should call goBackClick when the go back button is clicked', () => {
    render(<App />);

    const movieCard = screen.getByText('Movie 1');
    fireEvent.click(movieCard);
    const goBackButton = screen.getByTestId('search-icon');
    fireEvent.click(goBackButton);
    const appComponent = screen.getByTestId('app-component');
    const header = screen.getByTestId('header-component');
    const movieDetails = screen.queryByTestId('movie-details');
    const content = screen.getByTestId('movie-list');
    const counter = screen.getByTestId('counter-component');

    expect(appComponent).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(movieDetails).not.toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
  });
});
