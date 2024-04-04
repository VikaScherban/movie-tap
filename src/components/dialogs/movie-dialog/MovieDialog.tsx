import BaseDialog from "../base-dialog/BaseDialog";
import {MovieDialogData, NewMovie} from "../../../models/movies";
import MovieForm from "./movie-form/MovieForm";
import React from "react";
import {Portal} from "react-portal";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import useMovieById from "../../../hooks/UseMovieById";
import useSaveMovie from "../../../hooks/UseSaveMovie";

function MovieDialog({isEdit}: MovieDialogData): React.JSX.Element {
    const {navigateTo} = useMultipleSearchParams();
    const currentMovie = useMovieById();
    const title = isEdit ? 'Edit Movie' : 'Add New Movie';
    const {createMovie, updateMovie} = useSaveMovie();

    const onClose = (): void => {
        navigateTo('/');
    }

    const onAddNewMovie =  async (movie: NewMovie) => {
        await createMovie(movie);
        onClose();
    }
    const onEditMovie =  async (movie: NewMovie) => {
        // @ts-ignore
        await updateMovie({...movie, id: currentMovie?.id});
        onClose();
    }

    return (
        <>
            <Portal>
                <BaseDialog title={title} onClose={onClose}>
                    {currentMovie && <MovieForm onClose={onClose} movie={currentMovie} onSubmitChanges={onEditMovie}/> }
                    {!currentMovie && <MovieForm onClose={onClose} onSubmitChanges={onAddNewMovie}/>}
                </BaseDialog>
            </Portal>
        </>
    );
}

export default MovieDialog;
