import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {useLoaderData, useNavigate} from "@remix-run/react";
import BaseDialog from "~/components/dialogs/base-dialog/BaseDialog";
import MovieForm from "~/components/dialogs/movie-dialog/movie-form/MovieForm";
import {NewMovie} from "~/models/movies";
import useSaveMovie from "~/hooks/UseSaveMovie";

export const meta: MetaFunction = () => {
  return [
    { title: "Update Movie" },
    { name: "description", content: "Update movie" },
  ];
};

export async function loader({params}: LoaderFunctionArgs) {
  const movieId = params.movieId ?  Number(params.movieId) : null;

  console.log('movieId', movieId);

  if (!movieId) {
    return null;
  }

  const movie = await fetch(`http://localhost:4000/movies/${movieId}`);

  if (!movie) {
    throw new Response("Not Found", { status: 404 });
  }

  return movie.json();
}

export default function MovieIdEdit() {
  const {updateMovie} = useSaveMovie();
  const navigate = useNavigate();
  const currentMovie =  useLoaderData();

  const onClose = (): void => {
    navigate(-1);
  }

  const onSubmitChanges = async (movie: NewMovie) => {
    await updateMovie({...movie, id: currentMovie?.id});

    onClose();
  }

  return (
      <BaseDialog title='Edit Movie' onClose={onClose}>
        <MovieForm movie={currentMovie} onSubmitChanges={onSubmitChanges} onClose={onClose}/>
      </BaseDialog>
  );
}
