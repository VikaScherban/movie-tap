import "./Header.css";
import SearchForm from "./search-form/SearchForm";
import React from "react";
import {HeaderData} from "../../models/header";

function Header({query, addMovie, onSearchChanged}: HeaderData): React.JSX.Element {
    return (
        <div data-testid="header-component">
            <div className="wrap-header"></div>
            <div className="content-header">
                <div className="top-content">
                    <div className="logo-block"></div>
                    <button className="add-button" onClick={addMovie}>+ ADD MOVIE</button>
                </div>
                <div className="middle-content">
                    <SearchForm onSearchChanged={onSearchChanged}
                                initialQuery={query}
                    ></SearchForm>
                </div>
            </div>
        </div>
    );
}

export default Header;
