import "./Header.css";
import SearchForm from "./search-form/SearchForm";

function Header({addMovie}: {addMovie: () => void}) {
    const initialQuery = '';

    const searchChange = (query: string) => {
        console.log('searchChange', query);
    }

    return (
        <div data-testid="header-component">
            <div className="wrap-header"></div>
            <div className="content-header">
                <div className="top-content">
                    <div className="logo-block"></div>
                    <button className="add-button" onClick={addMovie}>+ ADD MOVIE</button>
                </div>
                <div className="middle-content">
                    <SearchForm searchChange={searchChange}
                                initialQuery={initialQuery}
                    ></SearchForm>
                </div>
            </div>
        </div>
    );
}

export default Header;
