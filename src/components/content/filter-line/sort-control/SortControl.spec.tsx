import {fireEvent, render, screen} from '@testing-library/react';
import SortControl from './SortControl';
import {SortByOption} from "../../../../constants/sort-control-const";

describe('SortControl', () => {
    let dummySortChanged: jest.Mock<any>;

    beforeEach(() => {
        dummySortChanged = jest.fn();
    })

    it('should render the sort control component', () => {
        render(<SortControl currentSorting={SortByOption.ReleaseDate} sortChanged={dummySortChanged} />);

        const sortControl = screen.getByTestId('sort-control');

        expect(sortControl).toBeInTheDocument();
    });

    it('should render the currentSorting value in the select element', () => {
        render(<SortControl currentSorting={SortByOption.ReleaseDate} sortChanged={dummySortChanged} />);

        const sortSelect = screen.getByTestId('sort-select');

        // @ts-ignore
        expect(sortSelect.value).toBe(SortByOption.ReleaseDate);
    });

    it('should call the sortChanged prop when the select option is changed', () => {
        render(<SortControl currentSorting={SortByOption.ReleaseDate} sortChanged={dummySortChanged} />);

        const sortSelect = screen.getByTestId('sort-select');
        fireEvent.change(sortSelect, { target: { value: SortByOption.Title } });

        expect(dummySortChanged).toHaveBeenCalledWith( SortByOption.Title);
    });
});
