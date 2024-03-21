import {useState} from "react";
import {Movie, MovieDialogState, MovieListState} from "../models/movies";
import Header from "./header/Header";
import MovieDetails from "./movie-details/MovieDetails";
import Content from "./content/Content";
import {Portal} from "react-portal";
import MovieDialog from "./dialogs/movie-dialog/MovieDialog";
import {SortByOptions} from "../constants/sort-control-const";
import useFilteredMovieList from "../hooks/UseFilteredMovieList";
import {GenreTitle} from "../constants/genres-const";
import React from "react";

function MovieListPage(): React.JSX.Element {
    const [state, updateState] = useState<MovieListState>({
        search: '',
        sortBy: SortByOptions.releaseDate.value,
        activeGenre: '',
        selectedMovie: null,
    });
    const [movieDialogData, setMovieDialogData] = useState<MovieDialogState>({
        isOpen: false,
        title: '',
        movie: null,
    });
    const movieList: Movie[] = useFilteredMovieList(state.sortBy, state.search, state.activeGenre);

    const onCloseModal = () => {
        setMovieDialogData({isOpen: false, title: '', movie: null});
    }

    const onAddMovie = () => {
        setMovieDialogData({isOpen: true, title: 'Add movie', movie: null});
    };

    const onMovieSelected = (id: number) => {
        updateState({...state, selectedMovie: getMovieInfo(id)});
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const goBackClick = () => {
        updateState({...state, selectedMovie: null});
    }

    const onMovieEdit = (id: number) => {
        setMovieDialogData({isOpen: true, title: 'Edit movie', movie: getMovieInfo(id)});
    }

    const onMovieDelete = (id: number) => {
        console.log(`Movie ${id} is removed`);
    }

    const onSubmitChanges = (movie: Movie): void => {
        const index = movieList.findIndex(item => item.id === movie.id);

        onCloseModal();

        if (index === -1) {
            console.log('New movie is added', movie);
        } else {
            console.log('Movie is updated', movie);
        }
    }

    const onGenreSelected = (newGenre: string): void => {
        const genre = newGenre === GenreTitle.All ? '' : newGenre;

        updateState({...state, activeGenre: genre});
    }

    const onSortChanged = (newValue: string): void => {
        updateState({...state, sortBy: newValue});
    }

    const onSearchChanged = (query: string): void => {
        updateState({...state, search: query});
    }

    const getMovieInfo = (id: number) => {
        return movieList.find((movie) => movie.id === id) || null;
    }

    return (
        <>
            {state.selectedMovie === null ?
                <Header query={state.search} addMovie={onAddMovie} onSearchChanged={onSearchChanged}/> :
                <MovieDetails movie={state.selectedMovie} goBackClick={goBackClick} />
            }
            <Content data={{movieList, sortBy: state.sortBy, activeGenre: state.activeGenre || GenreTitle.All}}
                     onMovieSelected={onMovieSelected}
                     onMovieDelete={onMovieDelete}
                     onMovieEdit={onMovieEdit}
                     onSortChanged={onSortChanged}
                     onGenreSelected={onGenreSelected}
            />
            {movieDialogData.isOpen &&
                <Portal>
                    <MovieDialog title={movieDialogData.title}
                                 onClose={onCloseModal}
                                 onSubmitChanges={onSubmitChanges}
                                 movie={movieDialogData.movie}
                    />
                </Portal>
            }
        </>
    );
}

export default MovieListPage;
