import BaseDialog from "../base-dialog/BaseDialog";
import {NewMovie} from "../../../models/movies";
import MovieForm from "./movie-form/MovieForm";
import React, {useEffect, useState} from "react";
import {Portal} from "react-portal";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";
import useMovieById from "../../../hooks/UseMovieById";
import useSaveMovie from "../../../hooks/UseSaveMovie";
import {MovieStatus} from "../../../constants/url-queries-const";

function MovieDialog(): React.JSX.Element {
    const {navigateTo} = useMultipleSearchParams();
    const {createMovie, updateMovie} = useSaveMovie();
    const movieData = useMovieById();
    const currentMovie = movieData.movie;
    const status = movieData.status;
    const [isLoading, setIsLoading] = useState(status === MovieStatus.Loading);

    useEffect(() => {
        if (status === MovieStatus.Ready) {
            setIsLoading(false);
        }
    }, [status]);

    const onClose = (): void => {
        navigateTo('/');
    }

    const onSubmitChanges = async (movie: NewMovie) => {
        if (currentMovie) {
            await updateMovie({...movie, id: currentMovie?.id});
        } else {
            await createMovie(movie);
        }

        onClose();
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Portal>
                <BaseDialog title={currentMovie ? 'Edit Movie' : 'Add New Movie'} onClose={onClose}>
                    <MovieForm onClose={onClose} movie={currentMovie} onSubmitChanges={onSubmitChanges}/>
                </BaseDialog>
            </Portal>
        </>
    );
}

export default MovieDialog;
