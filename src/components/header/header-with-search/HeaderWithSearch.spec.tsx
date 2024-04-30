import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import HeaderWithSearch from './HeaderWithSearch';
import useMultipleSearchParams from '../../../hooks/UseMultipleSearchParams';

jest.mock('../../../hooks/UseMultipleSearchParams', () => jest.fn());

describe('HeaderWithSearch', () => {
  let navigateToSpy: jest.SpyInstance;

  beforeEach(() => {
    navigateToSpy = jest.fn();
    // @ts-ignore
    useMultipleSearchParams.mockReturnValue({
      navigateTo: navigateToSpy,
      getQueryParams: jest.fn().mockReturnValue({}),
    });
  });

  it('should render without crashing', () => {
    render(<HeaderWithSearch />);

    expect(screen.getByText('+ ADD MOVIE')).toBeInTheDocument();
  });

  it('should show input field', () => {
    render(<HeaderWithSearch />);

    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
  });

  it('should open url with "new" path', () => {
    render(<HeaderWithSearch />);

    fireEvent.click(screen.getByText('+ ADD MOVIE'));

    expect(navigateToSpy).toHaveBeenCalledWith('/new');
  });
});
