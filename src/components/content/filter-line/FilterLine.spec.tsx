import {fireEvent, render, screen} from '@testing-library/react';
import FilterLine from './FilterLine';
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import {SortByOptions} from "../../../constants/sort-control-const";

jest.mock('../../../hooks/UseMultipleSearchParams',()  => jest.fn())

describe('FilterLine', () => {
    let updateQueryParamsSpy: jest.SpyInstance;
    let getQueryParamsSpy: jest.SpyInstance;

    beforeEach(() => {
        updateQueryParamsSpy = jest.fn();
        getQueryParamsSpy = jest.fn().mockReturnValue({});
        // @ts-ignore
        useMultipleSearchParams.mockReturnValue({
            updateQueryParams: updateQueryParamsSpy,
            getQueryParams: getQueryParamsSpy,
        });
    });

    it('should render the filter line component', () => {
        render(<FilterLine />);

        expect(screen.getByTestId('filter-line')).toBeInTheDocument();
        expect(screen.getByTestId('sort-control')).toBeInTheDocument();
    });

    it('should update genre when onGenreSelected is called', () => {
        const genre = 'Documentary';

        render(<FilterLine />);

        const documentary = screen.getByText(genre);
        fireEvent.click(documentary);

        expect(updateQueryParamsSpy).toHaveBeenCalledWith({ genre });
    });

    it('should update sort when onSortChanged is called', () => {
        render(<FilterLine />);

        const sortControl = screen.getByTestId('sort-select');
        fireEvent.change(sortControl, { target: { value: 'title' } });

        expect(updateQueryParamsSpy).toHaveBeenCalledWith({ sort: 'title' });
    });

    it('should set initial genre and sort', () => {
        const genre = 'Comedy';
        const sort = 'title';

        getQueryParamsSpy.mockReturnValue({genre, sort});

        render(<FilterLine />);

        const genreOption = screen.getByText(genre);
        const sortSelect = screen.getByTestId('sort-select');

        // @ts-ignore
        expect(sortSelect.value).toBe(SortByOptions.title.value);
        expect(genreOption).toHaveClass('active');
    });
});
