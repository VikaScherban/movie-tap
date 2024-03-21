import './SearchForm.css';
import {SearchData} from "../../../models/search";
import React, {useState} from "react";

function SearchForm({ onSearchChanged, initialQuery }: SearchData): React.JSX.Element {
    const [formData, setFormData] = useState({
        query: initialQuery,
    });
    const onSearch = (event: any): void => {
        onSearchChanged(formData.query);
        event.preventDefault();
    }

    const onKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            onSearchChanged(formData.query);
        }
    }

    const onQueryChange = (event: any): void => {
        const {name, value} = event.target;

        setFormData({...formData, [name]: value});
    }

    return (
      <form className="wrap-block" onSubmit={onSearch} data-testid="search-component">
          <div className="label">FIND YOUR MOVIE</div>
          <input type="text"
                 name="query"
                 value={formData.query}
                 onChange={onQueryChange}
                 onKeyDown={onKeyDown}
                 className="search-input"
                 placeholder='What do you want to watch?'
          />
          <button type="submit" className="search-button">SEARCH</button>
      </form>
  );
}

export default SearchForm;
