import {UrlQueries} from "../constants/url-queries-const";

export type UpdateQuery = (params: {[key in UrlQueries]?: string}, pathname?: string) => void
