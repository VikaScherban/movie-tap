import Header from './components/header/Header'
import './App.css';
import Content from "./components/content/Content";
import Counter from "./components/Counter";
import {useState} from "react";
import MovieDetails from "./components/movie-details/MovieDetails";
import {MoviesList} from "./constants/movies-const";
import {Portal} from "react-portal";
import MovieDialog from "./components/dialogs/movie-dialog/MovieDialog";
import {Movie, MovieDialogState} from "./models/movies";

function App() {
    const [moviesList, setMoviesList] = useState(MoviesList);
    const [movieId, setMovieId] = useState<null | number>(null);
    const [movieDialogData, setMovieDialogData] = useState<MovieDialogState>({isOpen: false, title: '', movie: null});

    const onCloseModal = () => {
        setMovieDialogData({isOpen: false, title: '', movie: null});
    }

    const onAddMovie = () => {
        setMovieDialogData({isOpen: true, title: 'Add movie', movie: null});
    };

    const onMovieSelected = (id: number) => {
        setMovieId(id);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const getMovieInfo = (id: number) => {
        return moviesList.find((movie) => movie.id === id) || null;
    }

    const goBackClick = () => {
        setMovieId(null);
    }

    const onMovieEdit = (id: number) => {
        setMovieDialogData({isOpen: true, title: 'Edit movie', movie: getMovieInfo(id)});
    }

    const onMovieDelete = (id: number) => {
        setMoviesList(moviesList.filter(item => item.id !== id));
    }

    const onSubmitChanges = (movie: Movie) => {
        const index = moviesList.findIndex(item => item.id === movie.id);

        onCloseModal();

        if (index === -1) {
            setMoviesList([...moviesList, movie])
        } else {
            setMoviesList([...moviesList.slice(0, index), movie, ...moviesList.slice(index + 1)]);
        }
    }

    return (
        <div data-testid="app-component">
            {movieId === null ?
                <Header addMovie={onAddMovie}/> :
                <MovieDetails movie={getMovieInfo(movieId)} goBackClick={goBackClick} />
            }
            <Content moviesList={moviesList}
                     onMovieSelected={onMovieSelected}
                     onMovieDelete={onMovieDelete}
                     onMovieEdit={onMovieEdit}
            />
            <Counter initialValue={0}/>
            {movieDialogData.isOpen &&
                <Portal>
                    <MovieDialog title={movieDialogData.title}
                                 onClose={onCloseModal}
                                 onSubmitChanges={onSubmitChanges}
                                 movie={movieDialogData.movie}
                    />
                </Portal>
            }
        </div>
    );
}

export default App;
