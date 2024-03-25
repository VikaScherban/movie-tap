import {fireEvent, render, screen} from '@testing-library/react';
import FilterLine from './FilterLine';
import {GenreTitle} from "../../../constants/genres-const";
import {SortByOptions} from "../../../constants/sort-control-const";

describe('FilterLine', () => {
    let currentGenreMock: GenreTitle;
    let onGenreSelectedSpy: jest.Mock<any>;
    let onSortChangedSpy: jest.Mock<any>;
    let currentSortingMock: string;

    beforeEach(() => {
        currentGenreMock = GenreTitle.All;
        onGenreSelectedSpy= jest.fn();
        onSortChangedSpy = jest.fn();
        currentSortingMock = SortByOptions.releaseDate.value;
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
        fireEvent.change(sortSelect, { target: { value: SortByOptions.title.value } });

        expect(onSortChangedSpy).toHaveBeenCalledWith(SortByOptions.title.value);
    });
});
