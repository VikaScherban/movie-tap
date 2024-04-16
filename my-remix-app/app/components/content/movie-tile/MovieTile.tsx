import {MovieTileData} from "../../../models/movies";
import {faEllipsisV, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import BaseDialog from "../../dialogs/base-dialog/BaseDialog";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";

function MovieTile({movieInfo, onMovieDelete}: MovieTileData): React.JSX.Element {
    const [isMenuOpen, setOpenMenu] = useState(false);
    const [isDeleteDialogOpen, setOpenDeleteDialog] = useState(false);
    const {navigateTo} = useMultipleSearchParams();

    const onEditClick = (event: any): void => {
        event.stopPropagation();
        setOpenMenu(true);
    }

    const onCloseMenu = (event: any): void => {
        event.stopPropagation();
        setOpenMenu(false);
    }

    const onEditMovie = (event:any): void => {
        event.stopPropagation();
        setOpenMenu(false);

        navigateTo(`/${movieInfo.id}/edit`);
    }

    const onDeleteMovie = (event:any): void => {
        event.stopPropagation();
        setOpenMenu(false);
        setOpenDeleteDialog(true);
    }

    const onCloseDeleteDialog = (event: any): void  => {
        event.stopPropagation();
        setOpenDeleteDialog(false);
    }

    const onMovieDeleteConfirm = (event: any): void => {
        event.stopPropagation();
        setOpenDeleteDialog(false);
        onMovieDelete(movieInfo.id)
    }

    const onMovieSelected = (id: number): void => {
        navigateTo(`/${id}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div className="movie-card" data-testid={"movie-card-" + movieInfo.id}>
            <div className="movie-poster" onClick={() => onMovieSelected(movieInfo.id)}>
                <img src={movieInfo.poster_path} alt={movieInfo.title} key={movieInfo.poster_path}/>
                <button className="three-dot-button" data-testid="three-dot-button"  onClick={onEditClick}>
                    <FontAwesomeIcon icon={faEllipsisV}/>
                </button>
                {isMenuOpen &&
                    <div className="edit-movie-menu">
                        <button className="edit-movie-close-button" data-testid="movie-close-button" onClick={onCloseMenu}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                        <div className="edit-movie-option"
                             onClick={onEditMovie}
                        >Edit</div>
                        <div className="edit-movie-option"
                             onClick={onDeleteMovie}
                        >Delete</div>
                    </div>
                }
                {isDeleteDialogOpen &&
                    <BaseDialog onClose={onCloseDeleteDialog} title="Delete movie">
                        <div className="confirm-message">Are you sure you want to delete this movie?</div>
                        <div className="movie-dialog-footer">
                            <button className="submit-button" onClick={onMovieDeleteConfirm}>CONFIRM</button>
                        </div>
                    </BaseDialog>
                }
            </div>
            <div className="movie-info">
                <div>
                <div className="movie-name" onClick={() => onMovieSelected(movieInfo.id)}>{movieInfo.title}</div>
                    <div className="movie-genres">{movieInfo.genres.join(', ')}</div>
                </div>
                <div className="movie-date">{movieInfo.release_date}</div>
            </div>
        </div>
    );
}

export default MovieTile;
