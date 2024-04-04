import { useNavigate, useLocation } from 'react-router-dom';
import useMultipleSearchParams from "./UseMultipleSearchParams";
import {renderHook} from "@testing-library/react";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}));

describe('useMultipleSearchParams', () => {
    let mockSearch: string;
    let mockPathname: string;

    beforeEach(() => {
        (useNavigate as jest.Mock).mockClear();
        (useLocation as jest.Mock).mockClear();

        mockSearch = '?param1=value1&param2=value2';
        mockPathname = '/movies';
    });

    it('should navigate correctly when updateQueryParams is called', () => {
        const navigateSpy = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigateSpy);
        (useLocation as jest.Mock).mockReturnValue({ search: '', genre: []});

        const { result } = renderHook(() => useMultipleSearchParams());

        const updatedParams = { search: 'Movie', genre: 'action' };
        result.current.updateQueryParams(updatedParams);

        expect(navigateSpy).toHaveBeenCalledWith({search: '?search=Movie&genre=action'});
    });

    it('should parse search params from the location object on mount', () => {
        (useLocation as jest.Mock).mockReturnValue({ search: '?search=action&genre=action' });

        renderHook(() => useMultipleSearchParams());

        expect(useLocation).toHaveBeenCalled();
    });

    it('should return the correct query parameters from the current location', () => {
        // @ts-ignore
        useLocation.mockReturnValue({ search: mockSearch });

        const { result } = renderHook(() => useMultipleSearchParams());
        const queryParams = result.current.getQueryParams();

        expect(queryParams).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should update the query parameters correctly', () => {
        const mockNavigate = jest.fn();

        (useLocation as jest.Mock).mockReturnValue({ search: mockSearch, pathname: mockPathname });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        const { result } = renderHook(() => useMultipleSearchParams());
        const newParams = { param1: 'newvalue1', param3: 'value3' };

        // @ts-ignore
        result.current.updateQueryParams(newParams);

        expect(mockNavigate).toHaveBeenCalledWith({
            pathname: mockPathname,
            search: '?param1=newvalue1&param2=value2&param3=value3',
        });
    });

    it('should navigate to the specified path with the current query parameters', () => {
        const mockNavigate = jest.fn();

        (useLocation as jest.Mock).mockReturnValue({ search: mockSearch });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        const { result } = renderHook(() => useMultipleSearchParams());
        const newPath = '/new-path';
        result.current.navigateTo(newPath);

        expect(mockNavigate).toHaveBeenCalledWith({
            pathname: newPath,
            search: mockSearch,
        });
    });

});
