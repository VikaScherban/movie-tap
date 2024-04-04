import {useState} from "react";
import {Movie, MovieDialogState} from "../models/movies";
import Header from "./header/Header";
import Content from "./content/Content";
import MovieDialog from "./dialogs/movie-dialog/MovieDialog";
import React from "react";
import useFilteredMovieList from "../hooks/UseFilteredMovieList";

function MovieListPage(): React.JSX.Element {
    const [movieDialogData, setMovieDialogData] = useState<MovieDialogState>({
        isOpen: false,
        title: '',
        movie: null,
    });
    const movieList: Movie[] = useFilteredMovieList();

    const onCloseModal = () => {
        setMovieDialogData({isOpen: false, title: '', movie: null});
    }

    const onMovieEdit = (id: number) => {
        setMovieDialogData({isOpen: true, title: 'Edit movie', movie: getMovieInfo(id)});
    }

    const onMovieDelete = (id: number) => {
        console.log(`Movie ${id} is removed`);
    }

    const onSubmitChanges = (movie: Movie): void => {
        onCloseModal();

        console.log('Movie is updated', movie);
    }

    const getMovieInfo = (id: number) => {
        return movieList.find((movie) => movie.id === id) || null;
    }

    return (
        <>
            <Header/>
            <Content movieList={movieList}
                     onMovieDelete={onMovieDelete}
                     onMovieEdit={onMovieEdit}
            />
            <MovieDialog isOpen={movieDialogData.isOpen}
                         title={movieDialogData.title}
                         onClose={onCloseModal}
                         onSubmitChanges={onSubmitChanges}
                         movie={movieDialogData.movie}
            />
        </>
    );
}

export default MovieListPage;
