import './SearchForm.css';
import {SearchData} from "../../../models/search";
import {useState} from "react";

function SearchForm({ searchChange, initialQuery }: SearchData) {
    const [formData, setFormData] = useState({
        query: initialQuery,
    });
    const onSearch = (event: any): void => {
        searchChange(formData.query);
        event.preventDefault();

        console.log('SearchForm, onSearch', formData.query);
    }

    const onKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            searchChange(formData.query);
        }
    }

    const onQueryChange = (event: any): void => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));

        console.log('SearchForm, onQueryChange', event.target.value);
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
