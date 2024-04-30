import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

jest.mock('react-router-dom', () => ({
  useRouteError: () => ({ statusText: 'Not found' }),
}));

describe('ErrorPage', () => {
  it('should render error message', () => {
    console.error = jest.fn();

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith({ statusText: 'Not found' });
  });
});
