import {fireEvent, render, screen} from '@testing-library/react';
import SortControl from './SortControl';
import {SortByOptions} from "../../../../constants/sort-control-const";

describe('SortControl', () => {
    let onSortChangedSpy: jest.Mock<any>;

    beforeEach(() => {
        onSortChangedSpy = jest.fn();
    })

    it('should render the sort control component', () => {
        render(<SortControl currentSorting={SortByOptions.releaseDate.value} onSortChanged={onSortChangedSpy} />);

        const sortControl = screen.getByTestId('sort-control');

        expect(sortControl).toBeInTheDocument();
    });

    it('should render the currentSorting value in the select element', () => {
        render(<SortControl currentSorting={SortByOptions.releaseDate.value} onSortChanged={onSortChangedSpy} />);

        const sortSelect = screen.getByTestId('sort-select');

        // @ts-ignore
        expect(sortSelect.value).toBe(SortByOptions.releaseDate.value);
    });

    it('should call the sortChanged prop when the select option is changed', () => {
        render(<SortControl currentSorting={SortByOptions.releaseDate.value} onSortChanged={onSortChangedSpy} />);

        const sortSelect = screen.getByTestId('sort-select');
        fireEvent.change(sortSelect, { target: { value: SortByOptions.title.value } });

        expect(onSortChangedSpy).toHaveBeenCalledWith(SortByOptions.title.value);
    });
});
