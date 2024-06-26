import React, {ChangeEvent, FormEvent, useState} from "react";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import {Outlet} from "@remix-run/react";

function SearchForm(): React.JSX.Element {
    const { updateQueryParams, getQueryParams } = useMultipleSearchParams();
    const {search} = getQueryParams();
    const [formSearch, updateFormSearch] =  useState(search || '');
    const onSearch = (event: FormEvent<HTMLFormElement>): void => {
        updateQueryParams({search: formSearch});
        event.preventDefault();
    }

    const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
            updateQueryParams({search: formSearch});
        }
    }

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        updateFormSearch(event.target.value || '');
    }

    return (
        <>
            <form className="wrap-block" onSubmit={onSearch} data-testid="search-component">
                <div className="label">FIND YOUR MOVIE</div>
                <input type="text"
                       name="query"
                       value={formSearch}
                       onChange={onQueryChange}
                       onKeyDown={onKeyDown}
                       className="search-input"
                       placeholder='What do you want to watch?'
                />
                <button type="submit" className="search-button">SEARCH</button>
            </form>
            <Outlet/>
        </>
    );
}

export default SearchForm;
