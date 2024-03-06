import {fireEvent, render, screen} from '@testing-library/react';
import FilterLine from './FilterLine';
import {GenresList} from "../../../constants/genres-const";
import {SortByOption} from "../../../constants/sort-control-const";
import {Genre} from "../../../models/genres";

describe('FilterLine', () => {
    let dummyCurrentGenre: Genre;
    let dummyGenreSelected: jest.Mock<any>;
    let dummySortChanged: jest.Mock<any>;
    let dummyCurrentSorting: SortByOption;

    beforeEach(() => {
        dummyCurrentGenre = GenresList[0];
        dummyGenreSelected= jest.fn();
        dummySortChanged = jest.fn();
        dummyCurrentSorting = SortByOption.ReleaseDate;
    });

    it('should render the filter line component', () => {
        render(
            <FilterLine
                currentGenre={dummyCurrentGenre}
                genreSelected={dummyGenreSelected}
                sortChanged={dummySortChanged}
                currentSorting={dummyCurrentSorting}
            />
        );
        const filterLine = screen.getByTestId('filter-line');

        expect(filterLine).toBeInTheDocument();
    });

    it('should call the sortChanged prop when the sorting option is changed', () => {
        render(
            <FilterLine
                currentGenre={dummyCurrentGenre}
                genreSelected={dummyGenreSelected}
                sortChanged={dummySortChanged}
                currentSorting={dummyCurrentSorting}
            />
        );

        const sortSelect = screen.getByTestId('sort-select');
        fireEvent.change(sortSelect, { target: { value: SortByOption.Title } });

        expect(dummySortChanged).toHaveBeenCalledWith(SortByOption.Title);
    });
});
