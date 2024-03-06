import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import Content from './Content';
import {GenresList} from "../../constants/genres-const";

describe('Content', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  it('renders the correct initial genre', () => {
    render(<Content />);

    expect(screen.getByText(GenresList[0].name)).toBeInTheDocument();
  });

  it('updates genre on select', () => {
    render(<Content />);

    fireEvent.click(screen.getByText(GenresList[1].name));

    expect(screen.getByText(GenresList[1].name)).toBeInTheDocument();
    expect(consoleLogSpy).toHaveBeenCalledWith('Content, genreSelected', GenresList[1]);
  });

});
