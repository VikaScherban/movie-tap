import SearchForm from "../search-form/SearchForm";
import useMultipleSearchParams from "~/hooks/UseMultipleSearchParams";

function HeaderWithSearch() {
    const { navigateTo } = useMultipleSearchParams();

    const onAddClick = () => {
        navigateTo('/new');
    }

    return (
        <>
            <div className="wrap-header"></div>
            <div className="content-header">
                <div className="top-content">
                    <div className="logo-block"></div>
                    <button className="add-button" onClick={onAddClick}>+ ADD MOVIE</button>
                </div>
                <div className="middle-content">
                    <SearchForm/>
                </div>
            </div>
        </>
    );
}

export default HeaderWithSearch;
