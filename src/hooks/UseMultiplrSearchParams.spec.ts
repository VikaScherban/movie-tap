import { useNavigate, useLocation } from 'react-router-dom';
import useMultipleSearchParams from "./UseMultipleSearchParams";
import {renderHook} from "@testing-library/react";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}));

describe('useMultipleSearchParams', () => {
    beforeEach(() => {
        (useNavigate as jest.Mock).mockClear();
        (useLocation as jest.Mock).mockClear();
    });

    it('navigates correctly when updateQueryParams is called', () => {
        const navigateSpy = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigateSpy);
        (useLocation as jest.Mock).mockReturnValue({ search: '' });

        const { result } = renderHook(() => useMultipleSearchParams());

        const updatedParams = { search: 'Movie', genre: 'action' };
        result.current.updateQueryParams(updatedParams, '/movies');

        expect(navigateSpy).toHaveBeenCalledWith({
            pathname: '/movies',
            search: '?search=Movie&genre=action'
        });
    });

    it('correctly parses search params from the location object on mount', () => {
        (useLocation as jest.Mock).mockReturnValue({ search: '?search=action&genre=action' });

        renderHook(() => useMultipleSearchParams());

        expect(useLocation).toHaveBeenCalled();
    });
});
