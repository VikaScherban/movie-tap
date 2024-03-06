import {fireEvent, render, screen} from '@testing-library/react';
import FilterLine from './FilterLine';
import {GenresList} from "../../../constants/genres-const";
import {SortByOption} from "../../../constants/sort-control-const";
import {Genre} from "../../../models/genres";

describe('FilterLine', () => {
    let currentGenreMock: Genre;
    let onGenreSelectedSpy: jest.Mock<any>;
    let onSortChangedSpy: jest.Mock<any>;
    let currentSortingMock: SortByOption;

    beforeEach(() => {
        currentGenreMock = GenresList[0];
        onGenreSelectedSpy= jest.fn();
        onSortChangedSpy = jest.fn();
        currentSortingMock = SortByOption.ReleaseDate;
    });

    it('should render the filter line component', () => {
        render(
            <FilterLine
                currentGenre={currentGenreMock}
                onGenreSelected={onGenreSelectedSpy}
                onSortChanged={onSortChangedSpy}
                currentSorting={currentSortingMock}
            />
        );
        const filterLine = screen.getByTestId('filter-line');

        expect(filterLine).toBeInTheDocument();
    });

    it('should call the sortChanged prop when the sorting option is changed', () => {
        render(
            <FilterLine
                currentGenre={currentGenreMock}
                onGenreSelected={onGenreSelectedSpy}
                onSortChanged={onSortChangedSpy}
                currentSorting={currentSortingMock}
            />
        );

        const sortSelect = screen.getByTestId('sort-select');
        fireEvent.change(sortSelect, { target: { value: SortByOption.Title } });

        expect(onSortChangedSpy).toHaveBeenCalledWith(SortByOption.Title);
    });
});
