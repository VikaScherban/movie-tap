import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SearchForm from "./SearchForm";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());

describe('SearchForm', () => {
  beforeEach(() => {
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      updateQueryParams: jest.fn()
    });
  });

  it('should render the search form', () => {
    render(<SearchForm />);

    expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    expect(screen.getByText('SEARCH')).toBeInTheDocument();
  });

  it('should update the form search value on input change', () => {
    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.change(queryInput, { target: { value: 'Action' } });

    // @ts-ignore
    expect(queryInput.value).toBe('Action');
  });

  it('should call updateQueryParams when the search button is clicked', () => {
    render(<SearchForm />);

    const searchButton = screen.getByRole('button', { name: 'SEARCH' });
    fireEvent.click(searchButton);

    expect(useMultipleSearchParams().updateQueryParams).toHaveBeenCalledWith({ search: '' });
  });

  it('should call updateQueryParams when Enter key is pressed in the input', () => {
    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.keyDown(queryInput, { key: 'Enter' });

    expect(useMultipleSearchParams().updateQueryParams).toHaveBeenCalledWith({ search: '' });
  });

  it('should not call updateQueryParams when Alt key is pressed in the input', () => {
    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.keyDown(queryInput, { key: 'Alt' });

    expect(useMultipleSearchParams().updateQueryParams).not.toHaveBeenCalledWith({ search: '' });
  });
});
