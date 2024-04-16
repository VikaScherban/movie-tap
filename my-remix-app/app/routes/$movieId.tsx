import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {Outlet, useLoaderData, useParams} from "@remix-run/react";
import MovieDetails from "~/components/header/movie-details/MovieDetails";
import Content from "~/components/content/Content";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie Details" },
    { name: "description", content: "Movie details" },
  ];
};

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort");
  const genre = url.searchParams.get("genre");

  const result = await fetch(`http://localhost:4000/movies?sortBy=${sort || ''}&sortOrder=asc&searchBy=title&search=${search || ''}&filter=${genre || ''}&limit=18`);

  if (!result) {
    throw new Response("Not Found", { status: 404 });
  }

  return result.json();
}

export default function MovieId() {
  const params = useParams();
  const movieId = params.movieId ?  Number(params.movieId) : null;
  const movieList = useLoaderData()?.data;
  const currentMovie = movieList?.find((movie) => movie.id === movieId);
  const onMovieDelete = (id: number) => {
    console.log(`Movie ${id} is removed`);
  }

  return (
      <>
        <MovieDetails movie={currentMovie}/>
        <Content onMovieDelete={onMovieDelete} movieList={movieList}/>
        <Outlet/>
      </>
  );
}
