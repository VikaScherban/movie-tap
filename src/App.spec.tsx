import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('renders', () => {
    render(<App />);

    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  it('should render the app component without a movie selected', () => {
    render(<App />);

    const header = screen.getByTestId('header-component');
    const movieDetails = screen.queryByTestId('movie-details');
    const content = screen.getByTestId('movie-list');
    const counter = screen.getByTestId('counter-component');
    const movieCards = screen.queryAllByTestId(new RegExp('^movie-card-'));

    expect(header).toBeInTheDocument();
    expect(movieDetails).not.toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
    expect(movieCards.length).toBe(6);
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

  it('opens the movie dialog when the Add movie button is clicked', () => {
    render(<App />);
    const addButton = screen.getByText('+ ADD MOVIE');
    fireEvent.click(addButton);
    const appComponent = screen.getByTestId('app-component');
    const movieDetails = screen.queryByTestId('movie-details');
    const movieDialog = screen.getByTestId('dialog');

    expect(appComponent).toBeInTheDocument();
    expect(movieDetails).not.toBeInTheDocument();
    expect(movieDialog).toBeInTheDocument();
    expect(movieDialog).toHaveTextContent('Add movie');
  });

  it('opens the movie dialog when the Edit movie button is clicked', () => {
    render(<App />);
    const movieCard = screen.getByTestId('movie-card-0');
    fireEvent.click(movieCard);
    const threeDotButtons = screen.getAllByTestId('three-dot-button');
    fireEvent.click(threeDotButtons[0]);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const movieDialog = screen.getByTestId('dialog');

    expect(movieDialog).toBeInTheDocument();
    expect(movieDialog).toHaveTextContent('Edit movie');
  });

  it('closes the movie dialog when the dialog is closed', () => {
    render(<App />);
    const addButton = screen.getByText('+ ADD MOVIE');
    fireEvent.click(addButton);
    const closeButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(closeButton);
    const movieDialog = screen.queryByTestId('dialog');

    expect(movieDialog).not.toBeInTheDocument();
  });

  it('calls onSubmitChanges when changes are submitted in the movie dialog', () => {
    render(<App/>);
    const addButton = screen.getByText('+ ADD MOVIE');
    fireEvent.click(addButton);
    fireEvent.change(screen.getByTestId('movie-name-input'), {
      target: {value: 'New Movie'},
    });
    fireEvent.click(screen.getByText('SUBMIT'));
    const movieDialog = screen.queryByTestId('dialog');
    const movieCards = screen.queryAllByTestId(new RegExp('^movie-card-'));

    expect(movieDialog).not.toBeInTheDocument();
    expect(movieCards.length).toBe(7)
  });
});
