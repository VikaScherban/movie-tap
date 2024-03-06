import {render, fireEvent, screen} from '@testing-library/react';
import GenreSelect from './GenreSelect';
import {GenresList} from "../../../../constants/genres-const";

describe('GenreSelect', () => {
  it('should render correct genre items', () => {
    const currentGenre = GenresList[1];
    const genreSelected = jest.fn();

    render(
        <GenreSelect
            genres={GenresList}
            currentGenre={currentGenre}
            genreSelected={genreSelected}
        />
    );

    const genreItems = screen.getAllByRole('listitem');

    expect(genreItems).toHaveLength(5);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Documentary')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('Crime')).toBeInTheDocument();
  });

  it('should highlight selected genre', () => {
    const currentGenre = GenresList[1];
    const genreSelected = jest.fn();

    render(
        <GenreSelect
            genres={GenresList}
            currentGenre={currentGenre}
            genreSelected={genreSelected}
        />
    );

    const documentaryTab = screen.getByText('Documentary');

    fireEvent.click(documentaryTab);

    expect(documentaryTab).toHaveClass('active');
  });

  it('should pass out selected genre', () => {
    const currentGenre = GenresList[1];
    const genreSelected = jest.fn();

    render(
        <GenreSelect
            genres={GenresList}
            currentGenre={currentGenre}
            genreSelected={genreSelected}
        />
    );

    const comedyTab = screen.getByText('Comedy');

    fireEvent.click(comedyTab);

    expect(genreSelected).toHaveBeenCalledWith(GenresList[2]);
  });
});
