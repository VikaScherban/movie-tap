import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {UrlQueries} from "../constants/url-queries-const";
import {UpdateQuery} from "../models/search";

const useMultipleSearchParams = (): {updateQueryParams: UpdateQuery} => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const mySearchParams = {};

        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            // @ts-ignore
            mySearchParams[key] = value;
        }
    }, [location.search]);

    const updateQueryParams = (params: {[key in UrlQueries]?: string}, pathname?: string) => {
        const searchParams = new URLSearchParams(location.search);

        Object.keys(params).forEach((key) => {
            // @ts-ignore
            searchParams.set(key, params[key]);
        });

        navigate({
            pathname: pathname || location.pathname,
            search: `?${searchParams.toString()}`,
        });
    };

    return { updateQueryParams };
};

export default useMultipleSearchParams;
