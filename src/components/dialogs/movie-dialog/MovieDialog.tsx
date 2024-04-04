import BaseDialog from "../base-dialog/BaseDialog";
import {MovieDialogData} from "../../../models/movies";
import MovieForm from "./movie-form/MovieForm";
import React from "react";
import {Portal} from "react-portal";

function MovieDialog({isOpen, onClose, onSubmitChanges, title, movie}: MovieDialogData): React.JSX.Element {
    return (
        <>
            {isOpen &&
                <Portal>
                    <BaseDialog title={title} onClose={onClose}>
                        <MovieForm onClose={onClose} movie={movie} onSubmitChanges={onSubmitChanges}/>
                    </BaseDialog>
                </Portal>
            }
        </>

    );
}

export default MovieDialog;
