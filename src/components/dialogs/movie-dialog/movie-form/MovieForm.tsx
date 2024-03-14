import "./MovieForm.css";
import Select, {MultiValue} from "react-select";
import {MovieFormData} from "../../../../models/movies";
import {GenreTitle} from "../../../../constants/genres-const";
import {useState} from "react";

function MovieForm({onClose, onSubmitChanges, movie}: MovieFormData) {
    const genreOptions = Object.values(GenreTitle).splice(1).map((genre) => ({value: genre, label: genre}));
    const currentGenresOptions = movie?.genres.map((genre) => ({value: genre, label: genre})) || [];

    const [formData, setFormData] = useState({
        name: movie?.name || '',
        imgUrl: movie?.imgUrl || '',
        genres: movie?.genres || [],
        date: movie?.date || '',
        rating: movie?.rating || 0,
        duration: movie?.duration || 0,
        description: movie?.description || ''
    });

    const onSelectChanged = (genresOptions: MultiValue<{value: GenreTitle; label: GenreTitle;}>) => {
        const value = genresOptions.map((genre) => genre.value)

        setFormData((prevState) => ({...prevState, 'genres': value}));
    }

    const onInputChanged = (event: any) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));
    }

    const onSubmit = (event: any) => {
        event.preventDefault();

        onSubmitChanges({...formData, id: movie?.id || Date.now()});
        console.log('MovieDialog data', formData);
    }

    return (
        <form onSubmit={onSubmit} data-testid="movie-form">
            <div>
                <div className="form-left-side">
                    <div className="movie-input">
                        <label htmlFor="movie-name">Title</label>
                        <input type="text"
                               name="name"
                               id="movie-name"
                               data-testid="movie-name-input"
                               onChange={onInputChanged} value={formData.name}
                        />
                    </div>
                    <div className="movie-input">
                        <label htmlFor="movie-img-url">Movie url</label>
                        <input type="text"
                               name="imgUrl"
                               id="movie-img-url"
                               placeholder="https://"
                               onChange={onInputChanged}
                               value={formData.imgUrl}
                        />
                    </div>
                    <div className="movie-input">
                        <label htmlFor="movie-genres">Genre</label>
                        <Select
                            className="genre-select"
                            name="genres"
                            id="movie-genres"
                            options={genreOptions}
                            isMulti
                            defaultValue={currentGenresOptions}
                            onChange={onSelectChanged}
                        />
                    </div>
                </div>
                <div className="form-right-side">
                    <div className="movie-input">
                        <label htmlFor="movie-date">Release Date</label>
                        <input type="date" name="date" id="movie-date" onChange={onInputChanged} value={formData.date}/>
                    </div>
                    <div className="movie-input">
                        <label htmlFor="movie-rating">Rating</label>
                        <input type="number" name="rating" step="0.1" id="movie-rating" onChange={onInputChanged} value={formData.rating}/>
                    </div>
                    <div className="movie-input">
                        <label htmlFor="movie-duration">Runtime</label>
                        <input type="number"
                               name="duration"
                               placeholder="minutes"
                               id="movie-duration"
                               onChange={onInputChanged}
                               value={formData.duration}
                        />
                    </div>
                </div>
                <div className="movie-input">
                    <label htmlFor="movie-description">Overview</label>
                    <textarea name="description"
                              placeholder="Movie description"
                              id="movie-description"
                              onChange={onInputChanged}
                              value={formData.description}
                    ></textarea>
                </div>
            </div>
            <div className="movie-dialog-footer">
                <button className="reset-button" onClick={onClose}>RESET</button>
                <button type="submit" className="submit-button">SUBMIT</button>
            </div>
        </form>
    );
}

export default MovieForm;
