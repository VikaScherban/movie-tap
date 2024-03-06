import Header from './components/header/Header'
import './App.css';
import Content from "./components/content/Content";
import Counter from "./components/Counter";
import {useState} from "react";
import MovieDetails from "./components/movie-details/MovieDetails";
import {MoviesList} from "./constants/movies-const";

function App() {
    const [movieId, setMovie] = useState<null | number>(null);

    const movieSelected = (id: number) => {
        setMovie(id);
    }

    const getMovieInfo = (id: number) => {
        return MoviesList.find((movie) => movie.id === id) || null;
    }

    const goBackClick = () => {
        setMovie(null);
    }

    return (
        <div data-testid="app-component">
            {movieId === null ? <Header/> : <MovieDetails movie={getMovieInfo(movieId)} goBackClick={goBackClick} />}
            <Content movieSelected={movieSelected}/>
            <Counter initialValue={0}/>
        </div>
    );
}

export default App;
