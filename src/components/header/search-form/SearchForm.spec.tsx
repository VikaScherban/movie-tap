import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SearchForm from "./SearchForm";

describe('SearchForm', () => {
  it('should renders with initial value', () => {
    const value = 'abc';
    const searchChange = jest.fn();
    render(<SearchForm initialQuery={value} onSearchChanged={searchChange} />);

    const from = screen.getByTestId('search-component');
    const queryInput = screen.getByDisplayValue(value);
    const submitButton = screen.getByRole('button');

    expect(from).toBeInTheDocument();
    expect(queryInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should trigger search change on form submission', () => {
    const searchChange = jest.fn();
    const initialQuery = 'initial query';
    const newQuery = 'new query';

    render(<SearchForm onSearchChanged={searchChange} initialQuery={initialQuery} />);
    const form = screen.getByTestId('search-component');
    const queryInput = screen.getByRole('textbox');

    fireEvent.change(queryInput, { target: { value: newQuery } });
    fireEvent.submit(form);

    expect(searchChange).toHaveBeenCalledWith(newQuery);
    expect(form).toHaveFormValues({ query: newQuery });
  });

  it('should trigger search change on pressing Enter', () => {
    const searchChange = jest.fn();
    const initialQuery = 'initial query';

    render(<SearchForm onSearchChanged={searchChange} initialQuery={initialQuery} />);
    const queryInput = screen.getByRole('textbox');

    fireEvent.keyDown(queryInput, { key: 'Enter', code: 13 });

    expect(searchChange).toHaveBeenCalledWith(initialQuery);
  });

  it('should not trigger search change on pressing Alt', () => {
    const searchChange = jest.fn();
    const initialQuery = 'initial query';

    render(<SearchForm onSearchChanged={searchChange} initialQuery={initialQuery} />);
    const queryInput = screen.getByRole('textbox');

    fireEvent.keyDown(queryInput, { key: 'Alt', code: 18 });

    expect(searchChange).not.toHaveBeenCalled();
  });
});
