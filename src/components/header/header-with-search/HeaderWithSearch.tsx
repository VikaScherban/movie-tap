import "./HeaderWithSearch.css";
import React, {useState} from "react";
import SearchForm from "../search-form/SearchForm";
import MovieDialog from "../../dialogs/movie-dialog/MovieDialog";
import {Movie, MovieDialogState} from "../../../models/movies";

function HeaderWithSearch(): React.JSX.Element {
    const [movieDialogData, setMovieDialogData] = useState<MovieDialogState>({
        isOpen: false,
        title: '',
        movie: null,
    });

    const onAddMovie = () => {
        setMovieDialogData({isOpen: true, title: 'Add movie', movie: null});
    }

    const onCloseModal = () => {
        setMovieDialogData({isOpen: false, title: '', movie: null});
    }

    const onSubmitChanges = (movie: Movie) => {
        onCloseModal();

        console.log('New movie is added', movie);
    }

    return (
        <>
            <div className="wrap-header"></div>
            <div className="content-header">
                <div className="top-content">
                    <div className="logo-block"></div>
                    <button className="add-button" onClick={onAddMovie}>+ ADD MOVIE
                    </button>
                </div>
                <div className="middle-content">
                    <SearchForm/>
                </div>
            </div>
            <MovieDialog isOpen={movieDialogData.isOpen}
                         title={movieDialogData.title}
                         onClose={onCloseModal}
                         onSubmitChanges={onSubmitChanges}
                         movie={movieDialogData.movie}
            />
        </>
    );
}

export default HeaderWithSearch;
