import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SearchForm from "./SearchForm";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());

describe('SearchForm', () => {
  let getQueryParamsSpy: jest.SpyInstance;
  let updateQueryParamsSpy: jest.SpyInstance;

  beforeEach(() => {
    getQueryParamsSpy = jest.fn().mockReturnValue({});
    updateQueryParamsSpy = jest.fn();
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      updateQueryParams: updateQueryParamsSpy,
      getQueryParams: getQueryParamsSpy,
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

    expect(updateQueryParamsSpy).toHaveBeenCalledWith({ search: '' });
  });

  it('should call updateQueryParams when Enter key is pressed in the input', () => {
    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.keyDown(queryInput, { key: 'Enter' });

    expect(updateQueryParamsSpy).toHaveBeenCalledWith({ search: '' });
  });

  it('should not call updateQueryParams when Alt key is pressed in the input', () => {
    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.keyDown(queryInput, { key: 'Alt' });

    expect(updateQueryParamsSpy).not.toHaveBeenCalledWith({ search: '' });
  });

  it('should set initial search value from url', () => {
    const text = 'Some movie';

    getQueryParamsSpy.mockReturnValue({search: text});

    render(<SearchForm />);

    const queryInput = screen.getByPlaceholderText('What do you want to watch?');

    // @ts-ignore
    expect(queryInput.value).toBe(text);
  });
});
