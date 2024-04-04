import {fireEvent, render, screen} from '@testing-library/react';
import FilterLine from './FilterLine';
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";

jest.mock('../../../hooks/UseMultipleSearchParams',()  => jest.fn(() => ({})))
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: () => jest.fn(),
}));

describe('FilterLine', () => {
    let updateQueryParamsSpy: jest.SpyInstance;

    beforeEach(() => {
        updateQueryParamsSpy = jest.fn();
        // @ts-ignore
        useMultipleSearchParams.mockReturnValue({
            updateQueryParams: updateQueryParamsSpy
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
});
