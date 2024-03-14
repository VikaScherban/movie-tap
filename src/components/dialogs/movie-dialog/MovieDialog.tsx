import BaseDialog from "../base-dialog/BaseDialog";
import {MovieDialogData} from "../../../models/movies";
import MovieForm from "./movie-form/MovieForm";

function MovieDialog({onClose, onSubmitChanges, title, movie}: MovieDialogData) {
    return (
        <BaseDialog title={title} onClose={onClose}>
            <MovieForm onClose={onClose} movie={movie} onSubmitChanges={onSubmitChanges}/>
        </BaseDialog>
    );
}

export default MovieDialog;
