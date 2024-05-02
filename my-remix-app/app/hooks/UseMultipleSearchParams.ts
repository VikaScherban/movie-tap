import {useEffect} from "react";
import {useLocation, useNavigate} from "@remix-run/react";
import {UrlQueries} from "~/constants/url-queries-const";
import {MultipleSearchParams} from "~/models/search";

const useMultipleSearchParams = (): MultipleSearchParams => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const mySearchParams = {};

        for (const [key, value] of searchParams.entries()) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            mySearchParams[key] = value;
        }
    }, [location.search]);

    const getQueryParams = (): {[key: string]: string} => {
        const urlSearchParams = new URLSearchParams(location.search);

        return Object.fromEntries(urlSearchParams.entries());
    }

    const updateQueryParams = (params: {[key in UrlQueries]?: string}) => {
        const searchParams = new URLSearchParams(location.search);

        Object.keys(params).forEach((key) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            searchParams.set(key, params[key]);
        });

        navigate({
            pathname: location.pathname,
            search: `?${searchParams.toString()}`,
        });
    };

    const navigateTo = (path: string): void => {
        const searchParams = new URLSearchParams(location.search);

        navigate({
            pathname: path,
            search: `?${searchParams.toString()}`,
        });
    }

    return { updateQueryParams, getQueryParams, navigateTo };
};

export default useMultipleSearchParams;
