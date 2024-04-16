import {UrlQueries} from "../constants/url-queries-const";

export type UpdateQuery = (params: {[key in UrlQueries]?: string}) => void

export interface MultipleSearchParams {
    updateQueryParams: UpdateQuery;
    navigateTo: (path: string) => void;
    getQueryParams: () => {[key: string]: string};
}
