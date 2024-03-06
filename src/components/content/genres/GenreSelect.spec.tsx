import {render, fireEvent, screen} from '@testing-library/react';
import GenreSelect from './GenreSelect';
import {GenresList} from "../../../constants/genres-const";

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
    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('DOCUMENTARY')).toBeInTheDocument();
    expect(screen.getByText('COMEDY')).toBeInTheDocument();
    expect(screen.getByText('HORROR')).toBeInTheDocument();
    expect(screen.getByText('CRIME')).toBeInTheDocument();
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

    const documentaryTab = screen.getByText('DOCUMENTARY');

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

    const comedyTab = screen.getByText('COMEDY');

    fireEvent.click(comedyTab);

    expect(genreSelected).toHaveBeenCalledWith(GenresList[2]);
  });
});
